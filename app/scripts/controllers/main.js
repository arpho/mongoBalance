'use strict';
var debug = function (s) {
    console.log(s);
}
angular.module('mongoBalanceApp')
    .controller('MainCtrl', function ($scope, $http,$rootScope) {
        $http.get('/api/purchase').success(function (purchase) {
            $scope.purchases = purchase;
            var payment = [];
            var category = [];
            $scope.calculateTotal = function() {
                Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
}
                $scope.Partial = 0;
                for (var i=0;i<$scope.purchases.length;i++) {
                   /* debug('payment=')
                    debug($scope.purchases[i].payment)
                    debug('category');
                    debug($scope.purchases[i].category)*/
                    if (($scope.purchases[i].payment==$scope.Payment) ||
                        ($scope.purchases[i].category.contains($scope.Category))) {
                        $scope.Partial += $scope.purchases[i].price;
                    }
                }
            }
            var purchaseLength = purchase.length;
            debug('controller');
            for (var i = 0; i < purchaseLength; i++) {
                if (purchase[i].payment in payment) {} else {
                    debug('aggiungo '+ purchase[i].payment);
                    payment.push(purchase[i].payment)
                }
                var categoryLength = purchase[i].category.length;
                for (var j = 0; j < purchase[i].category.length; j++) {
                    if (purchase[i].category[j] in category) {} else {
                        category.push(purchase[i].category[j]);
                    }
                }
            }
            $rootScope.payment = payment;
            $rootScope.category = category;
        });
    }).controller('AddCtrl', function ($scope, $http) {
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
        $http.post('/api/addPurchase',item).success(function(u) {debug('purchase sent to server');})
        debug(item);
    }
}).filter('isCategory', function() {
    return function(input, genre) {
        debug('filtering');
        if (typeof genre == 'undefined' || genre == null) {
            return input;
        } else {
            var out = [];
            for (var a = 0; a < input.length; a++){
                for (var b = 0; b < input[a].category.length; b++){
                    if(input[a].category[b] == genre) {
                        out.push(input[a]);
                    }
                }
            }
            return out;
        }
    };
});