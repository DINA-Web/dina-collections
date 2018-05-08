'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createFormBody(body) {
  return (0, _keys2.default)(body).reduce(function (str, bodyKey) {
    var val = body[bodyKey];
    if (str.length) {
      return str + '&' + bodyKey + '=' + val;
    }
    return bodyKey + '=' + val;
  }, '');
};