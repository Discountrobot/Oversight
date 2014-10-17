var mongoose = require('mongoose');

var ErrorSchema = new mongoose.Schema({
    ua: String,
    user: String,
    date: Number,
    event: String,
    trace: String,
    origin: String,
    status: Number
});

module.exports = mongoose.model('ErrorModel', ErrorSchema);