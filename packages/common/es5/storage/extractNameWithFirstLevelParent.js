'use strict';

var _require = require('../constants/storage'),
    LEVEL_INSTITUTION = _require.LEVEL_INSTITUTION,
    LEVEL_ROOM = _require.LEVEL_ROOM;

var groupTranslations = {
  cabinet: {
    en: 'cabinet',
    sv: ''
  },
  institution: {
    en: 'institution',
    sv: ''
  },
  mountingWall: {
    en: 'mounting wall',
    sv: ''
  },
  room: {
    en: 'room',
    sv: ''
  },
  shelf: {
    en: 'shelf',
    sv: ''
  }
};

var translateGroup = function translateGroup(groupName) {
  if (groupTranslations[groupName]) {
    return groupTranslations[groupName].en;
  }
  return groupName;
};

var extractNameWithFirstLevelParent = function extractNameWithFirstLevelParent(nestedStorageLocation) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$skipParentSuffix = _ref.skipParentSuffix,
      skipParentSuffix = _ref$skipParentSuffix === undefined ? false : _ref$skipParentSuffix;

  if (!nestedStorageLocation) {
    return '';
  }
  var group = nestedStorageLocation.group,
      name = nestedStorageLocation.name;

  if (group === LEVEL_INSTITUTION || group === LEVEL_ROOM) {
    return skipParentSuffix ? name : name + ' [' + translateGroup(group) + ']';
  }
  var parentName = extractNameWithFirstLevelParent(nestedStorageLocation.parent, { skipParentSuffix: true });
  return name + ' [' + translateGroup(group) + ' in ' + parentName + ']';
};
module.exports = extractNameWithFirstLevelParent;