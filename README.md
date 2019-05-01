# fbpac-extension

This is the repo for the [Facebook Political Ad Collector's](https://github.com/globeandmail/facebook-political-ads/) extension. To run the entire FBPAC setup, you'll also need to run [fbpac-backend](https://github.com/globeandmail/fbpac-backend) and [fbpac-api](https://github.com/globeandmail/fbpac-api), plus [fbpac-classifier](https://github.com/globeandmail/fbpac-classifier) if you're deploying a production version and want to classify your own ads.

The extension popup is a [preact](https://preactjs.com/) application and you can build a development version by running the following:

    $ cd extension
    $ npm install
    $ npm run watch

If you are a Firefox user you can open a clean browser instance with:

    $ npm run ff

and any changes will automatically refresh the extension. (You'll need webpack installed globally.)

In Chrome you can add an unpacked extension by following these [directions](https://developer.chrome.com/extensions/getstarted).

The development version submits ads to the development version of the backend, which is presumed to be running at [localhost:8080](localhost:8080).
