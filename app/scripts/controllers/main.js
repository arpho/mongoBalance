'use strict';
var debug = function (s) {
    console.log(s);
}
angular.module('mongoBalanceApp')
    .controller('MainCtrl', function ($scope, $http,$rootScope) {
        $http.get('/api/purchase').success(function (purchase) {
            $scope.purchases = purchase;
            $scope.total4categories = {};
            var addPlus = function(obj,k,v) {
                /*aggiunge unitem all'oggetto e lo inizializza se la chiave non è presenteaggiunge la chiave e pone il valore uguale a v, se già nel dizionario somma v al valore
                */
                if (typeof(obj[k]) =='undefined') { 
                    obj[k] = v;
                }
                else {
                    obj[k] += v;
                    obj[k] = Math.round(obj[k]*100) / 100; //round to the second decimal
                }
            }
            //calculate lengthdebug('lunghezza');
            for ( var i=0; i< $scope.purchases.length;i++) {
               if (Object.prototype.toString.call($scope.purchases[i].category)==Object.prototype.toString.call([])) {// controllose la categoria è una lista
                   for (var j=0; j<$scope.purchases[i].category.length;j++ ) {
                       addPlus($scope.total4categories,$scope.purchases[i].category[j],$scope.purchases[i].price);
                   }
               } else {
                    addPlus($scope.total4categories,$scope.purchases[i].category,$scope.purchases[i].price);
                }
            }
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
                    /* nel computo del parziale vanno considerate le spese che verificano entrambe le condizioni: category e payment, se una non è settata non deve essere computata quindi la sua parte dell'espressione booleana deve essere esclusa*/
                    if (typeof(field)=='undefined') {return true}
                    else {return condition}
                }
                for (var i=0;i<$scope.purchases.length;i++) {
                   /* debug('payment=')
                    debug($scope.purchases[i].payment)
                    debug('category');
                    debug($scope.purchases[i].category)*/
                    
                    var test = false;
                        test = ((typeof($scope.Payment)=='undefined')||($scope.purchases[i].payment==$scope.Payment)) && //se il tipo di pagamento non è definito, filtro solo su categoria
                         ( (typeof($scope.Category)=='undefined')||($scope.purchases[i].category.contains($scope.Category))); //se il tipo di  categoria non è definito filtro solo su pagamento
                    if (test) {
                        
                       // debug(test);
                             $scope.Partial += $scope.purchases[i].price;
                        }
                    
                }
            }
            var purchaseLength = purchase.length;
            for (var i = 0; i < purchaseLength; i++) {
                if (payment.contains(purchase[i].payment) ) {} else {
                    payment.push(purchase[i].payment)
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
