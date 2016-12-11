

module.exports = function() {
    var mongoose = require('mongoose');
    var connectionString = 'mongodb://localhost/cs5610fall2016';

    if(process.env.MONGODB_URI) {
        connectionString = process.env.MONGODB_URI
    }

    mongoose.connect(connectionString);

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
       // playerModel: require("../../project/model/player/player.model.server.js")()     
    };

//    var TestModel = mongoose.model("TestModel", TestSchema);
    return models;
};