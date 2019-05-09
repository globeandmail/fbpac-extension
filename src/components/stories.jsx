import React from "react";

export const Stories = () => (
  <div id="stories">
    <div className="precis">
      <h4>The Facebook Political Ad Collector is back up and running!</h4>
      <p>The Globe and Mail, a national newspaper in Canada and partner on the ad collector, has taken over stewardship of the project which was previously maintained by ProPublica.</p>
      <p>We&rsquo;ve updated and improved the extension, and fixed it in cases where Facebook modified their website&rsquo;s code in an effort to block the ad collector. ProPublica and all other publication partners will continue to have access to the ads submitted through this extension, the privacy rules around the project and extension have not changed, and, same as ProPublica, we will never collect your personal information during this project.</p>
      <p>Thank you again for your continued support. To learn more about the extension and The Globe&rsquo;s commitment to the project, check out the stories below.</p>
    </div>
    <ul>
      <li>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://tgam.ca/fbpac"
          >Help us monitor political ads on Facebook &nbsp;→</a>
        </p>
      </li>
    </ul>
    <div className="postcis">
      <p>If you have any questions about The Globe and Mail&rsquo;s Facebook political ads collector, send us an email at <a target="_blank"
      rel="noopener noreferrer" href="mailto:politicalads@globeandmail.com?subject=Feedback%20on%20extension">politicalads@globeandmail.com</a>.</p>
    </div>
  </div>
);
