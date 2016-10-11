const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');


//DB set up 'mongodb://localhost:auth/votingdb'
mongoose.connect(config.mongodb_url);

app.use(morgan('combined'));
app.use(cors());

app.use(bodyParser.json({type: "*/*" }));

router(app);

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('server listening on',port)
