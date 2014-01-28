'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('mongoBalanceApp', function() {

  it('should redirect index.html to /#/purchases', function() {
    browser().navigateTo('/#/index.html');
      console.log(browser().location.url());
    expect(browser().location().url()).toBe('/purchases');
  });
})