module.exports = function(app, models) {

    var widgetModel = models.widgetModel;

    var crypto = require('crypto');
    var path = require('path');
    var multer = require('multer'); 
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, __dirname+'/../../public/uploads')
        },

    filename: function (req, file, cb) {
            crypto.pseudoRandomBytes(16, function (err, raw) {
                if (err) return cb(err)
                cb(null, raw.toString('hex') + path.extname(file.originalname))
            })
        }
    });
    var upload = multer({ storage: storage });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "FIRST SUB HEADER"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "SECOND SUB HEADER"},
    ];
 
    app.post('/api/page/:pid/widget', createWidget);
    app.get('/api/page/:pid/widget', findWidgetsByPageId);
    app.put('/api/page/:pid/widget', reorderWidgets);
    app.get('/api/widget/:wgid', findWidgetById);
    app.put('/api/widget/:wgid', updateWidget);
    app.delete('/api/widget/:wgid', deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pid;
        widgetModel
            .createWidgetForPage(pageId, widget)
            .then(function(widget){
                res.json(widget);
            },function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pid;
        var query = req.query;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function(widgets){
                res.json(widgets);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        widgetModel
            .findWidgetById(widgetId)
            .then(function(widget){
                res.json(widget);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        widgetModel
            .deleteWidget(widgetId)
            .then(function(response){
                res.json(response);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.wgid;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(function(response){
                res.json(response);
            }, function(error){
                console.log(error);
                res.sendCode(400).send(error);
            });
    }

    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var filename      = myFile.filename;
        var url = '/uploads/' + filename;

        widget = {
            'widgth': width,
            'url': url
        }
        if(widgetId){
            widgetModel
                .updateWidget(widgetId, widget)
                .then(function(response){
                    res.json(response);
                }, function(error){
                    console.log(error);
                    res.sendCode(400).send(error);
                });
        } else {
            widgetModel
                .createWidgetForPage(pageId, widget)
                .then(function(widget){
                    res.json(widget);
                },function(error){
                    console.log(error);
                    res.sendCode(400).send(error);
                });
        }
    }

    function reorderWidgets(req, res){
        var pageId = req.params.pid;
        var start = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        widgetModel
            .reorderWidgets(pageId, start, final)
            .then(function(widgets){
                console.log("widgets");
                console.log(widgets);
                res.json(widgets);
            }, function(err){
                console.log(err);
                res.sendCode(400).send(err);
            })
        //var tempWidget = widgets[start];
        //widgets.splice(final, 0, widgets.splice(start, 1)[0]);
        //res.send(widgets);
    }

};