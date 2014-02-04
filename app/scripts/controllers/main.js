'use strict';
var debug = function (s) {
    //console.log(s);
}
angular.module('mongoBalanceApp')
    .controller('MainCtrl', function ($scope, $http,$rootScope) {
        $scope.Partial = 0;
        $scope.calculateTotal = function() {
        $scope.Partial = 0;
                    Array.prototype.contains = function(obj) {
        var i = this.length;
        while (i--) {
            if (this[i] == obj) {
                return true;
            }
        }
        return false;
    }
                   
                    var checkField = function(field,test) {
                        /* gli item possono essere filtrati secondo diversi criteri, per categoria, 
                        tipo di pagamento ecc., questa funzione verifica che il criterio di ricerca sia definito,
                        se non lo è ritorna sempre true, altrimenti ritorna  il valore della funzione di test valutata sull item
                        @param: Object, modello del criterio di ricerca
                        @param: test function: è una funzione che riceve in ingresso lo item da valutare rispetta una condizione, l'unico requisito che deve rispettare è che ritorni un boolean, viene eseguita da andConditions
                        @return: Boolean*/
                        if (typeof(field)=='undefined') {return true}
                        else {
                            return  test;
                             }
                    }
                    var andConditions = function(l,item) {
                        /*calcola il prodotto logico di tutte le funzioni test degli oggetti in una lista
                        @param: [filterCriteria]
                        @param: item in esame
                        @return: Boolean
                        */
                        var out = true;
                        for (var i=0;i<l.length;i++) {
                            out = out && checkField(l[i].field,l[i].test(item));
                        }
                        return out;
                    }
                    for (var i=0;i<$scope.purchases.length;i++) {
                       var FilterCriteria = [{field:$scope.Payment,test:function(v) {return v.payment == $scope.Payment;}},
                                             {field:$scope.Category,test:function(v) {return v.category.contains($scope.Category);}}];
                        
                        var test = false;
                            test = andConditions(FilterCriteria,$scope.purchases[i])
                        if (test) {
                            
                           // debug(test);
                            debug('test passed');
                            debug ($scope.purchases[i]);
                                 $scope.Partial += Math.round($scope.purchases[i].price*100)/100;
                            debug($scope.Partial);
                            }
                        
                    }
                }
        $scope.mainFunction = function(){
            /*carica tutti gli acquisti, viene eseguita all'avvio e quando siresettano i filtri*/
            $scope.rangeDate = ['day','week','month','year' ];
            
            var load = $http.get('/api/purchase'); // non è richiesto nessun filtro temporale
            if(! (typeof $scope.IntervalDate=="undefined" || $scope.IntervalDate == null || typeof $scope.RangeDate == 'undefined' || $scope.RangeDate == null ))  {
                var body = {};
                body.interval = $scope.IntervalDate;
                body.scale = $scope.RangeDate;
                  load = $http.post('/api/filter',body); // devo filtrare per data, inviola richiesta a node
            }
                
            load.success(function (purchase) {
                $scope.purchases = purchase;
                $scope.total4categories = {};
                $scope.calculateTotal();
                var addPlus = function(obj,k,v) {
                    /*aggiunge un item all'oggetto obj se la chiave non è presente aggiunge la chiave e pone il valore uguale a v, se già nel dizionario somma v al valore
                    @param: Object
                    @param: string, chiave
                    @param: number: valore da aggiungere
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
        }
        $scope.mainFunction();
    });
