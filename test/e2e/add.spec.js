describe('homepage', function() {
    var ptor;
  beforeEach(function() {
   browser.get('http://127.0.0.1:9000/'); //initialize the categories and payment list
      browser.get('http://127.0.0.1:9000/#/add');
      ptor = protractor.getInstance();
  });

  it('should load the add  page', function() {
    var ele = by.name('addPurchase');
    expect(ptor.isElementPresent(ele)).toBe(true);
  });
  it('submit should not be enabled',function() {
      var price = element(by.name('price')),
          oldCategory = element(by.name('oldCategory')),
          newCategory = element(by.name('newCategory')),
          oldPayment = element(by.name('oldPayment')),
          newPayment = element(by.name('newPayment')),
          item = element(by.name('item')),
          submit = element(by.id('submitButton'));
      expect(submit.isEnabled()).toBe(false);
      
      
  });
});