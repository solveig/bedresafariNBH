var  express = require('express.io')
  , app = express().http().io() // Web framework to handle routing requests
  , cons = require('consolidate') // Templating library adapter for Express
  , MongoClient = require('mongodb').MongoClient // Driver for connecting to MongoDB
  , routes = require('./routes') // Routes for our application
  ,  assert = require('assert');
  
  
  //app.http().io();
  //console.log('dirname='+__dirname);
  app.use('/',express.static(__dirname + '/client', { maxAge: 0 }));

   // in order to include css
   app.use(express.static(__dirname + '/public'));
   // app.use(express.static(__dirname + '/views'));

   //var url = 'mongodb://psi-heroku:bollersaftogburritos@paulo.mongohq.com:10015/psi';
   var url = 'mongodb://localhost:27017/psi';

  MongoClient.connect(url, function(err, db) {	
    "use strict";
    //if(err) throw err; old
    assert.equal(null, err);
    console.log("Connected correctly to server");


    // Register our templating engine
    app.engine('html', cons.swig);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

   
    // Express middleware to populate 'req.cookies' so we can access cookies
    app.use(express.cookieParser());

    //app.use(express.logger());
    // Express middleware to populate 'req.body' so we can access POST variables
   // fjerner denne legger til de 2 nese app.use(express.bodyParser());
   app.use(express.urlencoded());
   app.use(express.json());
 
    // Application routes
    routes(app, db);

    var port = process.env.PORT || 27017;
    app.listen(port);
    console.log('Express server listening on port ' + port );
});
