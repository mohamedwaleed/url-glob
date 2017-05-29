'use strict';
/* global describe, it, beforeEach */

var chai = require('chai');
var UrlGlob = require('../src/url-glob'); 
var assert = chai.assert;


describe('Url globing test', () => {

  describe('url globing', () => {
      it('it should throw expection in case of test,test', () => {
          var fn = function () {
              var urlGlob = new UrlGlob('test');
              urlGlob.match('test');
          }
          chai.expect(fn).to.throw(Error);
      });
      it('it should return true in case of test,http://test', () => {
        var urlGlob = new UrlGlob('test');
        var actual = urlGlob.match('http://test');
        assert.equal(actual, true);
      });
      it('it should return true in case of https://mail.google.com/**,https://mail.google.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('https://mail.google.com/**');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, true);
      });
      it('it should return true in case of https://mail.*.com/**,https://mail.google.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('https://mail.*.com/**');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, true);
      });
      it('it should return false in case of https://mail.*.com/*,https://mail.google.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('https://mail.*.com/*');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, false);
      });
      it('it should return true in case of https://mail.*.com/*/**,https://mail.xxxx.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('https://mail.*.com/*/**');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, true);
      });
      it('it should return true in case of https://mail.*.com/*/u/**,https://mail.xxxx.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('https://mail.*.com/*/u/**');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, true);
      });
      it('it should return true in case of *com/*/u/**,https://mail.xxxx.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('*com/*/u/**');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, true);
      });
      it('it should return false in case of *,https://mail.xxxx.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('*');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, false);
      });
      it('it should return true in case of **,https://mail.xxxx.com/mail/u/0/?tab=wm#inbox', () => {
        var urlGlob = new UrlGlob('**');
        var actual = urlGlob.match('https://mail.google.com/mail/u/0/?tab=wm#inbox');
        assert.equal(actual, true);
      });
      it('it should return true in case of f/**/m*d,https://f/df/sds/mfffd', () => {
        var urlGlob = new UrlGlob('f/**/m*d');
        var actual = urlGlob.match('https://f/df/sds/mfffd');
        assert.equal(actual, true);
      });
  });

});