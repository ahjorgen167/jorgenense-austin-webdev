module.exports = function(app) {


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
        //{ "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        //  "url": "https://www.youtube.com/embed/AM2Ivdi9c4E" },
        //{ "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        //{ "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
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
        if(!('_id' in widget)){
            widget._id = Math.floor((Math.random() * 999) + 1).toString();
        }
        if(!('pageId' in widget)){
            widget.pageId = pageId;
        }
        widgets.push(widget);
        res.send(widgets);
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pid;
        var query = req.query;
        var result = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                result.push(widgets[w]);
            }
        }
        res.send(result);
    }

    function reorderWidgets(req, res){
        var start = parseInt(req.query.initial);
        var final = parseInt(req.query.final);
        var tempWidget = widgets[start];
        widgets.splice(final, 0, widgets.splice(start, 1)[0]);
        res.send(widgets);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send('0');
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId){
                widgets.splice(w, 1);
            }
        }
        res.send(200);
    }

    function updateWidget(req, res) {
        var widget = req.body;
        var widgetId = req.params.wgid;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId){
                Object.keys(widget).forEach(function(key) {
                    widgets[w][key] = widget[key];
                });
            }
        }
        res.send(200);
    }

    function uploadImage(req, res) {
        console.log("hello!");
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var filename      = myFile.filename;     // new file name in upload folder
        /*
        var originalname  = myFile.originalname; // file name on user's computer
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        var url = path + '/' + filename;
        */

        for(var w in widgets) {
            if(widgets[w]._id === widgetId){
                widgets[w].url = '/uploads/' + filename;
                }
        }
        res.send(200);

/*
      { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "pidth": "100%",
        "url": "http://lorempixel.com/400/200/"}
*/
    }
};