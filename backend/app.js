'use strict'

const express = require('express');
const port = process.env.PORT || 8080;

const app = express();
const cors = require('cors');

app.use(cors({origin: '*'}));

app.listen(port, () => {
    console.log(`Server listening port: ${port}`);
});
