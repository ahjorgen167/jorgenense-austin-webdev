module.exports = function(app, models) {

    var actionModel = models.actionModel;

    app.post('/api/action/', createAction);
    app.get('/api/action/:aid', findActionById);
    app.put('/api/action/:aid', updateAction);
    app.delete('/api/action/:aid', deleteAction);

    function createAction(req, res) {
        var action = req.body;
        actionModel
            .createAction(action)
            .then(function(action){
                res.json(action);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findActionById(req, res) {
        var actionId = req.params.aid;
        actionModel
            .findActionById(actionId)
            .then(function(action){
                res.json(action);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function deleteAction(req, res) {
        var actionId = req.params.aid;
        actionModel
            .deleteAction(actionId)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }

    function updateAction(req, res) {
        var action = req.body;
        var actionId = req.params.aid;
        actionModel
            .updateAction(actionId, action)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }
};