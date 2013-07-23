'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../cms/app/forms2.html');
  });

  it('should be in the DOM', function() {
      expect(element('#idPath').count()).not.toBe(0);
  });
});
