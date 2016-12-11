module.exports = function(app, models) {

    var moveModel = models.moveModel;

    app.post('/api/move/', createMove);
    app.get('/api/move/:mid', findMoveById);
    app.put('/api/move/:mid', updateMove);
    app.delete('/api/move/:mid', deleteMove);

    function createMove(req, res) {
        var move = req.body;
        moveModel
            .createMove(move)
            .then(function(move){
                res.json(move);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findMoveById(req, res) {
        var moveId = req.params.aid;
        moveModel
            .findMoveById(moveId)
            .then(function(move){
                res.json(move);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function deleteMove(req, res) {
        var moveId = req.params.aid;
        moveModel
            .deleteMove(moveId)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }

    function updateMove(req, res) {
        var move = req.body;
        var moveId = req.params.aid;
        moveModel
            .updateMove(moveId, move)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }
};