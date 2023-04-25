'use strict'

const functions = require("firebase-functions");
const express = require('express');
const port = process.env.PORT || 8080;

const app = express();
const cors = require('cors');

const routes = require('./src/routes');

app.use(cors({origin: '*'}));
app.use('/api/', routes);

app.listen(port, () => {
    console.log(`Server listening port: ${port}`);
});

// exports.app = functions.https.onRequest(app);
