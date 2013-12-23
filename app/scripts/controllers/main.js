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
            Array.prototype.contains = function(obj) {
                var i = this.length;
                while (i--) {
                    if (this[i]==obj) { return true}
                }
                return false;
            }
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
                var checkFields = function(field,condition) {
                    /* nel computo del parziale vannoconsiderate le spese che verificano entrambe le condizioni se una non è settata non deve essere computata quindi la sua parte dell'espressione booleana deve essere esclusa*/
                    if (typeof(field)=='undefined') {return true}
                    else {return condition}
                }
                for (var i=0;i<$scope.purchases.length;i++) {
                   /* debug('payment=')
                    debug($scope.purchases[i].payment)
                    debug('category');
                    debug($scope.purchases[i].category)*/
                   /* var test = false;
                        test = ((typeof($scope.Payment)=='undefined')||($scope.purchases[i].payment==$scope.Payment)) &&
                         ( (typeof($scope.Category)=='undefined')||($scope.purchases[i].category.contains($scope.Category)));
                    debug(test)*/
                    if (checkFields($scope.Payment,$scope.purchases[i].payment==$scope.Payment) &&
                        checkFields($scope.Category,$scope.purchases[i].category.contains($scope.Category))) {
                        
                       // debug(test);
                             $scope.Partial += $scope.purchases[i].price;
                        }
                    
                }
            }
            var purchaseLength = purchase.length;
            debug('controller MainCtrl');
            for (var i = 0; i < purchaseLength; i++) {
                if (payment.contains(purchase[i].payment) ) {} else {
                    debug('aggiungo '+ purchase[i].payment);
                    payment.push(purchase[i].payment)
                    debug (payment);
                }
                var categoryLength = purchase[i].category.length;
                for (var j = 0; j < purchase[i].category.length; j++) {
                    if (category.contains(purchase[i].category[j])) {} else {
                        category.push(purchase[i].category[j]);
                    }
                }
            }
            $rootScope.payment = payment;
            $rootScope.category = category;
        });
    });
