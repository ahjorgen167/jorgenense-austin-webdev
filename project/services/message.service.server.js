module.exports = function(app, models) {

    var messageModel = models.messageModel;

    app.post('/api/message/', createMessage);
    app.get('/api/message/:mid', findMessageById);
    app.put('/api/message/:mid', updateMessage);
    app.delete('/api/message/:mid', deleteMessage);
    app.get('/api/message/:pid/player/:pid2', findMessagesByPlayers);

    function createMessage(req, res) {
        var message = req.body;
        messageModel
            .createMessage(message)
            .then(function(message){
                res.json(message);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findMessagesByPlayers(req, res) {
        var player1Id = req.params.pid;
        var player2Id = req.params.pid2;
        if(player2Id){            
            messageModel
                .findMessagesByPlayers(player1Id, player2Id)
                .then(function(messages){
                    res.json(messages);
                }, function(error){
                    console.log(error);
                    res.sendCode(400).send(error);
                });
        } else {
            messageModel
                .findAllMessagesForPlayer(player1Id)
                .then(function(messages){
                    res.json(messages);
                }, function(error){
                    console.log(error);
                    res.sendCode(400).send(error);
                });
        }
    }

    function findMessageById(req, res) {
        var messageId = req.params.aid;
        messageModel
            .findMessageById(messageId)
            .then(function(message){
                res.json(message);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function deleteMessage(req, res) {
        var messageId = req.params.aid;
        messageModel
            .deleteMessage(messageId)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }

    function updateMessage(req, res) {
        var message = req.body;
        var messageId = req.params.aid;
        messageModel
            .updateMessage(messageId, message)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }
};