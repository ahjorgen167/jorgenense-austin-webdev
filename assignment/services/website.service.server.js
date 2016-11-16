module.exports = function(app, models) {

   var websiteModel = models.websiteModel;

   var websites = [
      { "_id": "123", "name": "Facebook",    "developerId": "456" },
      { "_id": "234", "name": "Tweeter",     "developerId": "456" },
      { "_id": "456", "name": "Gizmodo",     "developerId": "123" },
      { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
      { "_id": "678", "name": "Checkers",    "developerId": "123" },
      { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findWebsitesByUserId);
    app.get('/api/website/:wid', findWebsiteById);
    app.put('/api/website/:wid', updateWebsite);
    app.delete('/api/website/:wid', deleteWebsite);

    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.uid;
        websiteModel
            .createWebsiteForUser(userId, website)
            .then(function(website){
                res.json(website);
            }, function(error){
                console.log(error);
                res.statusCode(400).send(error);
            });
    //       res.send(website);
    }

    function findWebsitesByUserId(req, res) {
        var userId = req.params.uid;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function(websites){
                res.json(websites);
            }, function(error){
                console.log(error);
                res.sendCode(400).res(error);
            })
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function(website){
                res.json(website);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }    

    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function(response){
                res.send(response);
            },function(error){
                res.sendCode(400).send(error);
            });
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.wid;
        websiteModel
            .updateWebsite(websiteId, website)
            .then(function(response){
                res.send(response);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }
};
