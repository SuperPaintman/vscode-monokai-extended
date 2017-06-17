#!/usr/bin/env node

'use strict';
/** Requires */
const fs         = require('fs');
const path       = require('path');
const assert     = require('assert');

const yaml       = require('js-yaml');
const tinycolor  = require('tinycolor2');
const Handlebars = require('handlebars');


/** Constants */
const SOURCE_PATH = path.join(__dirname, '../src/Monokai-Extended.yml');
const OUTPUT_PARH = path.join(__dirname, '../themes/Monokai-Extended.json');


/** Helpers */
function colorConvert(method, color, ...args) {
  return tinycolor(color)[method](...args)
    .toHex8String()
    .replace(/ff$/, '') // Clipping aplha if possible
    .toUpperCase()
    ;
}

function makeHelper(fn) {
  const { length } = fn;

  return function () {
    assert(arguments.length >= length + 1);

    for (let i = 0; i < length; i++) {
      assert(arguments[i] !== undefined);
    }

    return fn(...arguments);
  };
}

function makeHelperColor(method, argsLen = 0) {
  const length = argsLen + 1;

  return function (color, ...rest) {
    assert(arguments.length >= length + 1);

    for (let i = 0; i < length; i++) {
      assert(arguments[i] !== undefined);
    }

    return colorConvert(method, color, ...rest);
  };
}

/**
 * @param  {String} src
 * @return {Object}
 */
function compile(src) {
  const obj = yaml.load(src);

  // Variables
  const variables = obj['.variables'];
  delete obj['.variables'];

  const compiledVariables = {};

  Object.keys(variables)
    .forEach((key) => {
      const value = variables[key];

      const compiledKey = Handlebars.compile(key, {
        strict: true
      })(compiledVariables);
      const compiledValue = Handlebars.compile(value, {
        strict: true
      })(compiledVariables);

      compiledVariables[compiledKey] = compiledValue;
    });

  // Compile theme
  const stringifiedObj = JSON.stringify(obj);

  const compiledString = Handlebars.compile(stringifiedObj, {
    strict: true
  })(compiledVariables);

  return JSON.parse(compiledString);
}

/**
 * @param  {String} src
 * @return {String}
 */
function transformToJson(obj) {
  return JSON.stringify(obj, null, 2);
}


/** Init */
Handlebars.registerHelper({
  /** Colors */
  // Modifications
  lighten:    makeHelperColor('lighten', 1),
  brighten:   makeHelperColor('brighten', 1),
  darken:     makeHelperColor('darken', 1),
  desaturate: makeHelperColor('desaturate', 1),
  saturate:   makeHelperColor('saturate', 1),
  greyscale:  makeHelperColor('greyscale', 0),
  spin:       makeHelperColor('spin', 1),

  // Other
  alpha: makeHelper((color, value) => (
    colorConvert('setAlpha', color, value)
  ))
});

const source = fs.readFileSync(SOURCE_PATH, 'utf8');
const res = transformToJson(compile(source));

fs.writeFileSync(OUTPUT_PARH, res);
