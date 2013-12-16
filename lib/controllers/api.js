'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Purchase = mongoose.model('Purchase');
    var async = require('async');

exports.purchase = function(req,res) {
    return Purchase.find(function(e,r) {
        if (e) {return res.send(e)}
        else {res.json(r)}
        
    })
}

exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};
