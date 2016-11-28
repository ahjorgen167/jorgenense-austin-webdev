module.exports = function() {
    var mongoose = require("mongoose");
    var fieldTypes = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT'];

    var widgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.ObjectId, ref:"Page"},
        type: {type: String, enum: fieldTypes, default: 'TEXT'},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});


    return widgetSchema;
};