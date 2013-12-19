
var app = angular.module('mongoBalanceApp');
app.filter('isCategory', function() {
    return function(input, genre) {
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