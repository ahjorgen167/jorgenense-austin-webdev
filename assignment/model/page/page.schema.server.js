module.exports = function() {
    var mongoose = require("mongoose");
    var Widget = require("../widget/widget.schema.server.js")();

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.ObjectId, ref:"Website"},
        name: String,
        title: String,
        description: String,
        dateCreated: {type: Date, default: Date.now},
        widgets: [Widget]
    }, {collection: "assignment.page"});

    return PageSchema;
};