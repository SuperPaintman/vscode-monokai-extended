#!/usr/bin/env node

'use strict';
/** Requires */
const fs   = require('fs');
const path = require('path');

const yaml = require('js-yaml');


/** Constants */
const SOURCE_PATH = path.join(__dirname, '../src/Monokai-Extended.yml');
const OUTPUT_PARH = path.join(__dirname, '../themes/Monokai-Extended.json');


/** Helpers */
/**
 * @param  {String} src
 * @return {String}
 */
function transformToJson(src) {
  const obj = yaml.load(src);

  Object.keys(obj)
    .filter((key) => key.startsWith('.'))
    .forEach((key) => {
      delete obj[key];
    });

  return JSON.stringify(obj, null, 2);
}


/** Init */
const source = fs.readFileSync(SOURCE_PATH, 'utf8');
const res = transformToJson(source);

fs.writeFileSync(OUTPUT_PARH, res);
