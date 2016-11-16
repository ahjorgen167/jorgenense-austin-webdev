module.exports = function() {
    var mongoose = require("mongoose");
    var Page = require("../page/page.schema.server.js")();

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.ObjectId, ref:"User"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now},
        pages: [Page]
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};