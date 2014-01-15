'use strict';

var debug = function(s) {
    console.log(s);
}

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    Purchase = mongoose.model('Purchase');

exports.filter = function(req,res) {
    var par = req.body;
    debug(req.body);
    var scale = {}; // setto le durate dei periodi
    scale.week = 7;
    scale.day = 1;
    scale.month = 30;
    scale.year = 365;
    var since = new Date();
    since.setDate(since.getDate()-par.interval*scale[par.scale]); //imposto la data con cui filtrare
    debug(since);
    Purchase.find({data:{$gt:since}},function(e,r){
        if (e) {return res.send(e)}
        else {res.json(r)
        debug('found purchase');
        debug(r);
        debug('found no purchase')}
    })
    
}