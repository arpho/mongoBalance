'use strict';

var debug = function(s) {
    console.log(s);
}

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Purchase = mongoose.model('Purchase');
    var async = require('async');

exports.purchase = function(req,res) {
    debug('looking for items')
    return Purchase.find(function(e,r) {
        if (e) {return res.send(e)}
        else {res.json(r)
        debug('found items');
        debug(r);
        debug('found no purchase')}
        
    })
}
exports.addPurchase = function(req,res) {
    var item = req.body;
    var purchase = new Purchase();
    purchase.item = item.item;
    purchase.info = item.info;
    purchase.price = item.price;
    purchase.category = item.category;
    purchase.payment = item.payment;
    purchase.save();
    debug(item);
    res.send(item,200);
}

exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
        debug('found nothing')
        debug(err)
      return res.send(err);
    }
  });
};
