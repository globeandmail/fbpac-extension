import React from "react";

export const Stories = () => (
  <div id="stories">
    <div className="precis">
      <h4>Thank you for still participating in The Globe and Mail&rsquo;s Facebook Political Ad Collector project!</h4>
      <p>As you may have heard, Facebook modified their website&rsquo;s code in a way that temporarily interfered with the ad collector. Evidently, they don&rsquo;t think the database that we&rsquo;ve built together should exist.</p>
      <p>But, we&rsquo;re back up and running: collecting ads and the targeting explanations. Thanks for bearing with us. Here&rsquo;s some more info on that, and some more of what we found.</p>
    </div>
    <ul>
      <li>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.propublica.org/article/facebook-blocks-ad-transparency-tools"
          >Facebook Moves to Block Ad Transparency Tools — Including Ours &nbsp;→</a>
        </p>
      </li>
    </ul>
    <div className="postcis">
      <p>If you have any questions about The Globe and Mail&rsquo;s Facebook political ads collector, send us an email at <a target="_blank"
      rel="noopener noreferrer" href="mailto:politicalads@globeandmail.com?subject=Feedback%20on%20extension">politicalads@globeandmail.com</a>.</p>
    </div>
  </div>
);
