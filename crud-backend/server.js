// import modules
var express= require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

var route = require('./route/routes');

// Connect to Mongodb
mongoose.connect('mongodb://localhost:27017/todolistdb');

// on connection
mongoose.connection.on('connected', ()=>{
    console.log('MongoDB connected at port 27017');
});

// on connection error
mongoose.connection.on('error', (err)=>{
    console.log('err');
});

const port = 4000;

//Adding Middleware - cors
app.use(cors());

app.use(bodyparser.json());

app.use('/api', route);

app.get('/', (req, res)=>{
    res.send('Some Changes');
})

app.listen(port, ()=>{
    console.log('Server has been started at port ' + port);
});