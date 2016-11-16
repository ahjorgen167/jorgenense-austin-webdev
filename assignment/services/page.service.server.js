module.exports = function(app, models) {

    var pageModel = models.pageModel;

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findPagesByWebsiteId);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.wid;
        pageModel
            .createPage(websiteId, page)
            .then(function(page){
                res.json(page);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.wid;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function(pages){
                res.json(pages);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        pageModel
            .findPageById(pageId)
            .then(function(page){
                res.json(page);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        pageModel
            .deletePage(pageId)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pid;
        pageModel
            .updatePage(pageId, page)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.sendCode(400).send(error);
            });
    }
};