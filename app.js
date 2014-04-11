
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect( 'mongodb://localhost:27017/pvc-v2' );

ListService = require('./services/lists').ListService;
PointService = require('./services/points').PointService;

// Schemas

var List = new mongoose.Schema({
  title: String
});

var ListModel = mongoose.model('List', List);


var Point = new mongoose.Schema({
  body: String,
  isCon: Boolean,
  listId: [mongoose.Schema.Types.ObjectId]
});

var PointModel = mongoose.model('Point', Point);

var listService = new ListService(ListModel, PointModel);
var pointService = new PointService(PointModel);

// Routes

app.get('/', function (req, res){
  res.render('index.jade');
});

// List INDEX
app.get('/api/lists', function (req, res) {
  listService.index(function(response){
    res.json(response);
  });
});

// List NEW
app.post('/api/lists', function (req, res) {
  listService.new(req.body.title, function(response) {
    res.send(response);
  })
});

// List SHOW
app.get('/api/lists/:id', function (req, res) {
  listService.show(req.params.id, function(response) {
    res.json(response);
  });
});

// List UPDATE
app.put('/api/lists/:id', function (req, res) {
  listService.update(req.params.id, req.body.title, function(response){
    res.send(response);
  });
});

// List DESTROY
app.delete('/api/lists/:id', function (req, res) {
  listService.destroy(req.params.id, function(response){
    res.send(response);
  });
});

// Point INDEX
app.get('/api/lists/:id/points', function (req, res) {
  pointService.index(req.params.id, function(response){
    res.json(response);
  });
});

// Point NEW
app.post('/api/lists/:id/points', function (req, res){
  pointService.new(req.params.id, req.body.body, req.body.isCon, function(response){
    res.send(response);
  });
});

// Point SHOW
app.get('/api/lists/:id/points/:point_id', function (req, res) {
  pointService.show(req.params.point_id, function(response) {
    res.json(response);
  });
});

// Point UPDATE
app.put('/api/lists/:id/points/:point_id', function  (req, res) {
  pointService.update(req.params.point_id, req.body.body, req.body.isCon, function(response){
    res.send(response);
  });
});

// Point DESTROY
app.delete('/api/lists/:id/points/:point_id', function  (req, res) {
  pointService.destroy(req.params.point_id, function(response){
    res.send(response);
  });
});

// Create server

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
