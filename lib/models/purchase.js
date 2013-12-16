'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
// Schema
var PurchaseSchema = new Schema({
  item: String,
  info: String,
  data: { type: Date, default: Date.now },
  price: Number,
    category: [String],
    payment:String
});

// Validations
/*ThingSchema.path('awesomeness').validate(function (num) {
  return num >= 1 && num <= 10;
}, 'Awesomeness must be between 1 and 10');*/

mongoose.model('Purchase', PurchaseSchema);
