const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const categorySchema = new Schema ({
    name: {type: String, required:true},
    parent: {type: String, default: null}
});

module.exports = mongoose.model('Category', categorySchema);
