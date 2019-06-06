# fbpac-extension

This is the extension for the [Facebook Political Ad Collector](https://github.com/globeandmail/facebook-political-ads/). For a full breakdown of the other services you'll need to deploy the app, see the [README for our main repo](https://github.com/globeandmail/facebook-political-ads/blob/master/README.md).

Built versions are available for [Firefox](https://addons.mozilla.org/en-US/firefox/addon/facebook-ad-collector/) and [Chrome](https://chrome.google.com/webstore/detail/facebook-political-ad-col/enliecaalhkhhihcmnbjfmmjkljlcinl).

### Installation

The extension popup is a [preact](https://preactjs.com/) application and you can build a development version by running the following:

```sh
cd extension
npm install
npm run watch
```

Once that's running, you'll want a clean browser instance. Open a new terminal tab to the same directory, then run the command below with either `chrome` or `ff`, depending on whether you want to test in Chrome or Firefox:

```sh
npm run [chrome|ff]
```

and any changes will automatically refresh the extension. (You may need webpack installed globally.)

A few other localized `npm` scripts, such as a Firefox dev environment with Canadian or German locales, are available in the `package.json` scripts section.

In Chrome, you can add an unpacked extension by following these [directions](https://developer.chrome.com/extensions/getstarted).

The development version submits ads to the development version of the backend, which is presumed to be running at [localhost:8080](localhost:8080).

### Deployment

To build the extension, you have two options: you can either increment the version, which will kick off the build process, by running

```sh
npm version [major|minor|patch]
```

or you can just rebuild the extension without incrementing the version by running

```sh
npm run release
```

In both cases, a .zip file will be created in the `./web-ext-artifacts` folder. You'll want to upload that to the relevant Chrome or Firefox store.

Note: If uploading to the Firefox store, you have to do one more step. Go to **Github -> Releases**, then download the release zip. Then be sure to upload it again (the un-minified source) to the Firefox store in the "Source Code" section to make sure that the reviewer can see it (since the code is minified). You'll want to note in the Note to the Reviewer section that "There are instructions for how to build the extension in the README in the extension/ folder in the archive -- you'll want to use `$ npm run dist` to generate the same minified, production code as in the uploaded version of the extension."
