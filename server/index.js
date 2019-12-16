const express = require('express');

// use process.env variables to keep private variables,
require('dotenv').config();

// Express Middleware
const helmet = require('helmet'); // creates headers that protect from attacks (security)
const bodyParser = require('body-parser'); // turns response into usable format
const cors = require('cors'); // allows/disallows cross-site communication
const morgan = require('morgan'); // logs requests

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'jira-clone-db'
  }
});

// Controllers - aka, the db queries
const main = require('./controllers/main');
const clients = require('./controllers/clients');

// App
const app = express();

// App Middleware
const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined')); // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'));
app.get('/jira-clone', (req, res) => main.getTableData(req, res, db));
app.get('/jira-clone/:id', (req, res) => main.getTableDataFromId(req, res, db));
app.post('/jira-clone', (req, res) => main.postTableData(req, res, db));
app.put('/jira-clone', (req, res) => main.putTableData(req, res, db));
app.delete('/jira-clone', (req, res) => main.deleteTableData(req, res, db));

// App Routes - Clients
app.get('/clients', (req, res) => clients.getClients(req, res, db));
app.post('/clients', (req, res) => clients.postClient(req, res, db));

// App Server Connection
app.listen(process.env.PORT || 8080, () => {
  console.log(`app is running on port ${process.env.PORT || 8080}`);
});
