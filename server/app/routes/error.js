var ErrorModel = require('../models/error');
var parser = new (require('ua-parser-js'))();

exports.post = function(req, res){

    var error = new ErrorModel();
    var ua = parser.setUA(req.headers['user-agent']).getResult();
        ua = (ua.browser.name + " " + ua.browser.major + " on " + ua.os.name);

    // Serverside params
    error.ua     = ua;
    error.date   = new Date().getTime();
    error.origin = req.headers['referer'];

    // POST params
    error.event  = req.body.event;
    error.status = req.body.status;
    error.trace  = req.body.trace;
    error.user   = req.body.user || "anonymous";

    error.save(function(err) {
        if (err) res.send(err);
        res.json({ message: error._id + " created", id: error._id });
    });
};