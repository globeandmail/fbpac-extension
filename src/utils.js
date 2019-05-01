import { sortBy } from "lodash";
import { RatingType, MOST_RECENT_STORIES_UPDATE } from "constants.js";

export const adForRequest = ad => ({
  id: ad.id,
  html: ad.html,
  targeting: ad.targeting
});

const endpoint =
  process.env.NODE_ENV === "production"
    ? "https://fbads.theglobeandmail.com/facebook-ads/ads"
    : "http://localhost:8080/facebook-ads/ads";

const headers = language =>
  new Headers({
    "Accept-Language": language.language + "-" + language.country + ";q=1.0"
  });

export const sendAds = (body, language) =>
  fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: headers(language),
    body: JSON.stringify(body)
  });

export const getAds = (language, cb) =>
  fetch(endpoint, {
    method: "GET",
    headers: headers(language)
  })
    .then(res => res.json())
    .then(ads => {
      ads.ads.forEach(ad => delete ad.targetings);
      return ads;
    })
    .then(ads => cb(ads.ads || ads));

export const mergeAds = (ads, newAds) => {
  ads.forEach(ad => delete ad.targetings);
  let ids = new Map(ads.map(ad => [ad.id, ad]));
  newAds.forEach(ad => {
    if (ids.has(ad.id)) {
      let old = ids.get(ad.id);
      let newAd = Object.assign({}, old, ad);
      ids.set(newAd.id, newAd);
    } else {
      ids.set(ad.id, ad);
    }
  });
  const idSort = sortBy(
    Array.from(ids.values()),
    a => -1 * Date.parse(a.created_at)
  );
  return sortBy(idSort, a => a.rating === "political").slice(0, 100);
};

export const updateBadge = (ratings, stories_seen) => {
  if (!stories_seen || MOST_RECENT_STORIES_UPDATE > stories_seen) {
    chrome.browserAction.setBadgeText({ text: "!" });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#DA161F" });
  } else {
    const num = ratings.filter(rating => !("rating" in rating)).length;
    chrome.browserAction.setBadgeBackgroundColor({ color: "#0099E6" });
    if (num > 0) {
      chrome.browserAction.setBadgeText({
        text: num > 100 ? "100+" : "" + num
      });
    } else {
      chrome.browserAction.setBadgeText({ text: "" });
    }
  }
};

// Ad utilities
export const getUnratedRatings = ratings =>
  ratings.filter(
    rating => rating.rating === RatingType.POLITICAL || !("rating" in rating)
  );

export const countUnratedRatings = ratings =>
  ratings.filter(rating => !("rating" in rating)).length;
