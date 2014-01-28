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
  it('form should not be valid',function() {
      var price = by.name('price'),
          oldCategory = by.name('oldCategory'),
          newCategory = by.name('newCategory'),
          oldPayment = by.name('oldPayment'),
          newPayment = by.name('newPayment'),
          item = by.name('item');
      
  });
});