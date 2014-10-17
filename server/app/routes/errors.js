var ErrorModel = require('../models/error');

exports.get = function(req, res){
    ErrorModel.find(function(err, errors) {
        if (err) res.send(err);
        res.json(errors);
    });
};