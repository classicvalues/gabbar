'use strict';

var test = require('tape');
var fs = require('fs');
var path = require('path');

var getFeaturesByAction = require('../../../gabbar/utilities/changeset').getFeaturesByAction;
var hAttributes = require('../../../gabbar/attributes/highway');


test('Convert tags into a string for tokenization', function (t) {
    let changesetPath = path.join(__dirname, '../../fixtures/changesets/48255884.json');
    let changeset = JSON.parse(fs.readFileSync(changesetPath));

    let modifiedFeatures = getFeaturesByAction(changeset, 'modify');

    // Let's take one of the modified features.
    let feature = modifiedFeatures[0];

    // Feature is an array in [newVersion, oldVersion] format.
    let asString = hAttributes.tagsToString(feature[0], feature[1]);

    t.equal(asString, '{landuse=forest}');
    t.end();
});


test('Get headers of attributes', function (t) {
    let headers = hAttributes.getAttributeHeaders();
    t.equal(headers.length, 16);
    t.end();
});
