'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('mongoBalanceApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/purchase').respond([{
    "_id": "52aeb5e016942648d8a0a974",
    "info": "item di test",
    "item": "test",
    "payment": "test payment",
    "price": 0,
    "category": [
      "test category"
    ],
    "data": "2013-12-16T08:12:16.269Z"
  },
  {
    "payment": "test payment",
    "price": 0,
    "info": "no note",
    "item": "test form",
    "_id": "52af0dafbc61a84c49000006",
    "__v": 0,
    "category": [
      "test category"
    ],
    "data": "2013-12-16T14:26:55.824Z"
  },
  {
    "payment": "visa",
    "price": 9.58,
    "item": "spesa punto simply",
    "_id": "52b2ff4692a450f313000006",
    "__v": 0,
    "category": [
      "alimenti"
    ],
    "data": "2013-12-19T14:14:30.000Z"
  },
                                                     
  {
    "payment": "test payment",
    "price": 0,
    "info": "i controller sono separati",
    "item": "break test",
    "_id": "52b3ffe18b0662d114000006",
    "__v": 0,
    "category": [
      "test category"
    ],
    "data": "2013-12-20T08:29:21.173Z"
  },
    {
    "payment": "visa",
    "price": 6.66,
    "info": "per la festa di natale della scuola",
    "item": "torta naturasì",
    "_id": "52b5f1db11bf8b4a31000008",
    "__v": 0,
    "category": [
      "alimenti",
      "gnosis"
    ],
    "data": "2013-12-21T19:54:03.721Z"
  }
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    ])    
    scope = $rootScope.$new();
      // creo il controller
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
it('should calculate the total for every category',function(){
    expect(scope.total4categories).toBeUndefined();
    $httpBackend.flush();
    var total4categories = {'alimenti':16.24,'test category':0,gnosis:6.66};
    expect(scope.total4categories).toEqual(total4categories);
})
it('calculate total ', function() {
   // scope.Payment = "test payment";
    $httpBackend.flush();
    expect(Math.round(scope.Partial*100)/100).toEqual(16.24);
})
it('calculate total for payment test payment', function() {
    scope.Payment = "test payment";
    $httpBackend.flush();
    expect(Math.round(scope.Partial*100)/100).toEqual(0);
})
it('calculate total for payment visa', function() {
    scope.Payment = "visa";
    $httpBackend.flush();
    expect(Math.round(scope.Partial*100)/100).toEqual(16.24);
})
it('calculate total for payment visa for gnosis', function() {
    scope.Payment = "visa";
    scope.Category = 'gnosis';
    $httpBackend.flush();
    expect(Math.round(scope.Partial*100)/100).toEqual(6.66);
})
  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings).toBeUndefined();
    $httpBackend.flush();
    expect(scope.awesomeThings.length).toBe(4);
  });
  it('should attach a list of purchases to the scope',function () {
    expect(scope.purchases).toBeUndefined();
    $httpBackend.flush();
    expect(scope.purchases.length).toBe(5);
  });
});

xdescribe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});