module.exports = function(app) {

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
        if(!('_id' in page)){
            page._id = Math.floor((Math.random() * 999) + 1).toString();
        }
        if(!('wid' in page)){
            page.websiteId = websiteId;
        }
        pages.push(page);
        res.send(page);
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.wid;
        var result = [];
        for(var p in pages) {
            if(pages[p].websiteId === websiteId) {
                result.push(pages[p]);
            }
        }
        res.send(result);
    }

    function findPageById(req, res) {
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.send(pages[p]);
                return;
            }
        }
        res.send('0');
    }

    function deletePage(req, res) {
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id === pageId){
                pages.splice(p, 1);
            }
        }
        res.send(200);
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pid;
        for(var p in pages) {
            if(pages[p]._id === pageId){
                Object.keys(page).forEach(function(key) {
                    pages[p][key] = page[key];
                });
            }
        }
        res.send(200);
    }
};