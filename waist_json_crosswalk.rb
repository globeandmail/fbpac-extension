require 'csv'
require 'json'
require 'base64'
# FBPAC taxonomy
# TargetingParsed::Gender(s) => Targeting::new("Gender", Some(s)),
# TargetingParsed::City(s) => Targeting::new("City", Some(s)),
# TargetingParsed::State(s) => Targeting::new("State", Some(s)),
# TargetingParsed::Region(s) => Targeting::new("Region", Some(s)),
# TargetingParsed::Age(s) => Targeting::new("Age", Some(s)),
# TargetingParsed::MinAge(s) => Targeting::new("MinAge", Some(s)),
# TargetingParsed::MaxAge(s) => Targeting::new("MaxAge", Some(s)),
# TargetingParsed::Interest(s) => Targeting::new("Interest", Some(s)),
# TargetingParsed::Segment(s) => Targeting::new("Segment", Some(s)),
# TargetingParsed::Retargeting(s) => Targeting::new("Retargeting", Some(s)),
# TargetingParsed::Agency(s) => Targeting::new("Agency", Some(s)),
# TargetingParsed::Website(s) => Targeting::new("Website", Some(s)),
# TargetingParsed::Language(s) => Targeting::new("Language", Some(s)),
# TargetingParsed::Employer(s) => Targeting::new("Employer", Some(s)),
# TargetingParsed::School(s) => Targeting::new("School", Some(s)),
# TargetingParsed::Like => Targeting::new("Like", None),
# TargetingParsed::List => Targeting::new("List", None),

# __typename
#	WAISTUICustomAudienceType
#	WAISTUIAgeGenderType
#	WAISTUILocationType
#	WAISTUILocaleType
#	WAISTUIInterestsType
#	WAISTUIBCTType

AGE_OFFSET = 12 # twitter seems to reflect ages as the age in years minus twelve. So, 65 is reflected in JSON as 53. Weird.

GENDER_CROSSWALK = {
	"MALE" => "men",
	"FEMALE" => "women"
}

CSV.open("json_targetings.csv", headers: true).each do |row|
	targ_json = row["targeting"]
	advertiser = row["advertiser"]
	next unless targ_json[0] == "[" || targ_json[0..22] == "{\"waist_targeting_data\""
	data = JSON.parse(targ_json)
	if data.is_a?(Hash) && data.has_key?("waist_targeting_data")
		targeting = data["waist_targeting_data"] # this is necessary for all post Nov 13 data.
	else 
		targeting = data
	end
	if advertiser.nil? && data.is_a?(Hash) && data.has_key?("waist_advertiser_info")
		advertiser = data["waist_advertiser_info"]["name"]
	end
	targets = targeting.map do |elem|
		# puts Base64.decode64(elem["id"])
		case elem["__typename"]
		when "WAISTUICustomAudienceType"
			# puts [JSON.parse(elem["serialized_data"])["ca_type"], elem["waist_ui_type"]].inspect
			# waist_ui_type
			# CUSTOM_AUDIENCES_WEBSITE
			# CUSTOM_AUDIENCES_ENGAGEMENT_PAGE
			# CUSTOM_AUDIENCES_LOOKALIKE
			case elem["waist_ui_type"]
			when "CUSTOM_AUDIENCES_WEBSITE"
				[["Website", "people who have visited their website or used one of their apps"]]
			when "CUSTOM_AUDIENCES_ENGAGEMENT_PAGE"
				[["Activity on the Facebook Family", nil]] # https://www.facebook.com/business/help/221146184973131?id=2469097953376494
			when "CUSTOM_AUDIENCES_LOOKALIKE"
				[["Retargeting", "people who may be similar to their customers"]]
			else
				puts "UNKNOWN waist UI type: #{elem["waist_ui_type"] }"
			end
		when "WAISTUIAgeGenderType"
			# {"__typename"=>"WAISTUIAgeGenderType", "waist_ui_type"=>"AGE_GENDER", "age_min"=>23, "age_max"=>53, "gender"=>"ANY",  "id"=>"V0FJU1RVSUFnZUdlbmRlclR5cGU6MjM1Mw==", "serialized_data"=>"{\"age_min\":23,\"age_max\":53,\"gender\":null}",}
			[
				["MinAge", elem["age_min"] + AGE_OFFSET], 
				elem["age_max"] != 53 ? ["MaxAge", elem["age_max"] + AGE_OFFSET] : nil, 
				["Age", (elem["age_max"] == 53 ? "#{elem["age_min"] + AGE_OFFSET} and older" : (elem["age_min"] == 0 ? "#{elem["age_max"] + AGE_OFFSET} and younger" : "#{elem["age_min"] + AGE_OFFSET} to #{elem["age_max"] + AGE_OFFSET}"))], # TODO. 30 to 45, 45 and older,  35 and younger
				elem["gender"] != "ANY" ? ["Gender", GENDER_CROSSWALK[elem["gender"]]] : nil
			]
		when "WAISTUILocationType"
			# {"__typename"=>"WAISTUILocationType", "id"=>"V0FJU1RVSUxvY2F0aW9uVHlwZTpjaXR5LmhvbWUuMjQzMDUzNg==", "serialized_data"=>"{\"location_granularity\":\"city\",\"location_geo_type\":\"home\",\"location_code\":\"2430536\"}", "waist_ui_type"=>"LOCATION", "location_name"=>"Atlanta, Georgia", "location_type"=>"HOME"}
			# {"__typename"=>"WAISTUILocationType", "id"=>"V0FJU1RVSUxvY2F0aW9uVHlwZTpjb3VudHJ5LmhvbWUuVVM=", "serialized_data"=>"{\"location_granularity\":\"country\",\"location_geo_type\":\"home\",\"location_code\":\"US\"}", "waist_ui_type"=>"LOCATION", "location_name"=>"the United States", "location_type"=>"HOME"}
			# City... Occasionally has a comma in it. 
			# State # only in city state pairs
			# Region # e.g. United States, California

			locs = case JSON.parse(elem["serialized_data"])["location_granularity"] 
			when "city"
				*city, state = elem["location_name"].split(",")
				[["City", city], ["State", state]]
			when "region"
				[["Region", elem["location_name"]]]
			when "country"
				[["Country", elem["location_name"]]]
			else
				puts "UNKNOWN location_granularity: #{JSON.parse(elem["serialized_data"])["location_granularity"] }"
				puts elem
				[[]]
			end
				
			locs + [["Location Granularity", JSON.parse(elem["serialized_data"])["location_granularity"] ], ["Location Type", elem["location_type"]]]
		when "WAISTUILocaleType"
			elem["locales"].map{|l| ["Language", l]}
		when "WAISTUIInterestsType"
			elem["interests"].map{|i| ["Interest", i["name"]]}
		when "WAISTUIBCTType" # thus far, likely engagement with conservative content
			[["Segment", elem["name"]]]
		when "WAISTUIEduStatusType"
			[["Education", elem["edu_status"]], ["Segment", elem["edu_status"] == "EDU_COLLEGE_ALUMNUS" ? "Bachelor's degree" :  elem["edu_status"] ]]
		else
			puts "Unknown WAIST type #{elem["__typename"]}"
			[[]]
		end
	end.flatten(1).compact
	puts advertiser
	targets.each{|targ| puts "\t#{targ}"}
end
