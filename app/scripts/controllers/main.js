'use strict';
var debug = function(s) {
    console.log(s);
}
angular.module('mongoBalanceApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/purchase').success(function(purchase) {
      $scope.purchases = purchase;
        debug(purchase)
    });
  });
