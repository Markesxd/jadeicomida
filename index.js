const express = require('express');
require('dotenv').config();
const router = require('./src/router');

const port = process.env.PORT
const app = express();
app
    .use(express.json())
    .use(router);

app.listen(port , () => console.log(`runing on port ${port}`))