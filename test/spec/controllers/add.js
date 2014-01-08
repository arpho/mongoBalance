'use strict';

describe('Controller: AddCtrl', function () {

  // load the controller's module
  beforeEach(module('mongoBalanceApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
   /* $httpBackend.expectGET('/api/awesomeThings')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']); */   
    scope = $rootScope.$new();
    MainCtrl = $controller('AddCtrl', {
      $scope: scope
    });
  }));

  it('should attach an item  to the scope', function () {
   // expect(scope.awesomeThings).toBeUndefined();
    //$httpBackend.flush();
    expect(scope.item).toBe('item');
  });
});