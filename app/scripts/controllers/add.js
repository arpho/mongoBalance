'use strict';
var debug = function (s) {
   // console.log(s);
}
angular.module('mongoBalanceApp').controller('AddCtrl', function ($scope, $http) {
    $scope.item = 'item';
    $scope.pushCategory = function(v) { 
        debug('categoria selezionata '+v);
        if (typeof($scope.selected_category)=='undefined') {
            $scope.selected_category=[v];
        }
        else {
                $scope.selected_category.push(v);
                debug($scope.selected_category);
             }
    }
    $scope.submitForm = function() {
        debug('on submit');
        debug($scope.selected_category);
        var item = {};
        item.item = $scope.item;
        item.info = $scope.info;
        item.price = $scope.price;
        item.payment = $scope.newPayment || $scope.Payment;
        item.category = $scope.selected_category;
       // item.category.push($scope.newCategory|| $scope.Category);
        $http.post('/api/addPurchase',item).success(function(u) {$scope.result = 'acquisto aggiunto';})
        debug(item);
        $window.location='/login/homepage'
    }
});