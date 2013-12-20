'use strict';

var debug = function(s) {
    console.log(s);
}

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Purchase = mongoose.model('Purchase');
    var async = require('async');

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