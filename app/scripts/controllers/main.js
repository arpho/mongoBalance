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
            var purchaseLength = purchase.length
            debug('controller');
            for (var i = 0; i < purchaseLength; i++) {
                if (purchase[i].payment in payment) {} else {
                    debug('aggiungo '+ purchase[i]);
                    payment.push(purchase[i].payment)
                }
                var categoryLength = purchase[i].category.length;
                for (var j = 0; j < purchase[i].category.length; j++) {
                    if (purchase[i].category[j] in category) {} else {
                        category.push(purchase[i].category[j]);
                    }
                }
            }
            debug('payment');
            debug(payment);
            debug('category');
            debug(category)
            $rootScope.payment = payment;
            $rootScope.category = category;
        });
    }).controller('AddCtrl', function ($scope, $http) {});