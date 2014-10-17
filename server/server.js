
// Module dependencies  
var basicAuth  = require('basic-auth-connect');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var express    = require('express');

// Config
config         = require('./app/config');

// Database
mongoose.connect(config.db.mongodb, (config.db.options || {}));
// attach event handlers
mongoose.connection.on('error',
    console.error.bind(console, 'db connection error:')
);
mongoose.connection.on('open',
    console.info.bind(console, "db connection established")
);

// Routes  
var routes     = {};
routes.error   = require('./app/routes/error');
routes.errors  = require('./app/routes/errors');

// Oversight instantiation
var oversight  = express();
var router     = express.Router();
var port       = config.server.port || process.env.PORT || 80;
var www        = config.server.static || './www';


// Apply request parsers
oversight.use(bodyParser.urlencoded({ extended: true }));
oversight.use(bodyParser.json());

// enable CORS
oversight.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Apply routes 
   anything not specified here will be handled by express.static 
*/
oversight.post('/error', routes.error.post);
oversight.get('/errors', routes.errors.get);

// Setup static content route   
// oversight.use(basicAuth('oversight', 'password'));
oversight.use(express.static(www));

// Boot
oversight.listen(port);
console.log('Oversight is watching on ' + port);