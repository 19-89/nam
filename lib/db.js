var mongoose = require('mongoose');
var options = require('../options');

mongoose.connect(options.mongoDbUrl);

var PostSchema = new mongoose.Schema({
    title: String,
    text: String
});

module.exports.mongoose = mongoose;
module.exports.Post = mongoose.model('Post', PostSchema);
