//Express Package
const express = require('express');

//Initializing an Express appication to const app
const app = express();

const router = express.Router();
const mongoose = require('mongoose');

//import config module 'database.js'
const config = require('./config/database');

//import node element
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

//enable cross routes
const cors = require('cors');

//Database Connection to MongoDb using Config module
mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err){
        console.log('Could NOT connect to database: ', err);
    }else{
        console.log('Connected to database: ' + config.db);
    }
    
});

//Delete in deployment stage
app.use(cors({
    origin: 'http://localhost:4200'
}))

//Provide static directory for frontend
//parse application/x-www-form-urLencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/json
app.use(bodyParser.json());

//Connects to index.html after building for deployment
app.use(express.static(__dirname + '/client/dist/'));

//Connects to authentication.js
app.use('/authentication', authentication);

//Connect server to Angular 2 Index.html
app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

//Start Server: Listen on port 8080
app.listen(8080, () =>{
    console.log('Listenig on port 8080');
});