module.exports = function(app) {

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
        if(!('_id' in website)){
            website._id = Math.floor((Math.random() * 999) + 1).toString();
        }
        if(!('developerId' in website)){
            website.developerId = userId;
        }
        websites.push(website);
        res.send(website);
    }

    function findWebsitesByUserId(req, res) {
        var userId = req.params.uid;
        var result = [];
        for(var w in websites) {
            if(websites[w].developerId === userId) {
                result.push(websites[w]);
            }
        }
        res.send(result);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.wid;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }


    function deleteWebsite(req, res) {
        var websiteId = req.params.wid;
        for(var w in websites) {
            if(websites[w]._id === websiteId){
                websites.splice(w, 1);
            }
        }
        res.send(200);
    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.wid;
        for(var w in websites) {
            if(websites[w]._id === websiteId){
                Object.keys(website).forEach(function(key) {
                    websites[w][key] = website[key];
                });
            }
        }
        res.send(200);
    }
};