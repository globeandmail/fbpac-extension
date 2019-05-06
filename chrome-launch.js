#!/usr/bin/env node

const chromeLaunch = require("chrome-launch"); // eslint-disable-line import/no-extraneous-dependencies

const args = [
  "--load-extension=./build",
  "--temp-profile",
  "--password-store=basic",
];

// third item is the param, first two are node path and file path
if (process.argv[2]) args.push(`--lang="${process.argv[2]}"`);

console.log(args);

chromeLaunch("https://www.facebook.com", { args });
