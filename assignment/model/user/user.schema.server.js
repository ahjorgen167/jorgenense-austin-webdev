module.exports = function() {
    var mongoose = require("mongoose");
    var Website = require("../website/website.schema.server.js")();

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        dateCreated: {type: Date, default: Date.now},
        websites: [Website]
    }, {collection: "assignment.user"});

    return UserSchema;
};