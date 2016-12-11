module.exports = function(app) {

	var models = require("./model/models.server")();

    require("./services/player.service.server.js")(app, models);
    require("./services/action.service.server.js")(app, models);
    require("./services/message.service.server.js")(app, models);
    require("./services/game.service.server.js")(app, models);

};