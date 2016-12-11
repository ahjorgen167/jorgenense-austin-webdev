module.exports = function() {
    var mongoose = require("mongoose");
    
    var MessageSchema = mongoose.Schema({
        to: {type: mongoose.Schema.ObjectId, ref:"Player"},
        from: {type: mongoose.Schema.ObjectId, ref:"Player"},
        message: String,
        dateSent: {type: Date, default: Date.now},
    }, {collection: "assignment.message"});

    return MessageSchema;
};
