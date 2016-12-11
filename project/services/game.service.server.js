module.exports = function(app, models) {

    var gameModel = models.gameModel;

    app.post('/api/player/:pid/game', createGame);
    app.get('/api/player/:pid/game', findGamesByPlayerId);
    app.get('/api/game/:pid', findGameById);
    app.put('/api/game/:pid', updateGame);
    app.delete('/api/game/:pid', deleteGame);

    function createGame(req, res) {
        var game = req.body;
        game.player1 = req.params.pid;
        gameModel
            .createGame(game)
            .then(function(game){
                res.json(game);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findGamesByPlayerId(req, res) {
        var playerId = req.params.wid;
        gameModel
            .findAllGamesForPlayer(playerId)
            .then(function(games){
                res.json(games);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findGameById(req, res) {
        var gameId = req.params.pid;
        gameModel
            .findGameById(gameId)
            .then(function(game){
                res.json(game);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function deleteGame(req, res) {
        var gameId = req.params.pid;
        gameModel
            .deleteGame(gameId)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }

    function updateGame(req, res) {
        var game = req.body;
        var gameId = req.params.pid;
        gameModel
            .updateGame(gameId, game)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }
};