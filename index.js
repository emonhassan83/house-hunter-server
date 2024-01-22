const express = require('express');
const dbConnect = require('./config/dbConnect');
// const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;

// * connection to MongoDB
dbConnect();

app.use('/', (req, res)=> {
    res.send("Hello from House Hunter server side!");
})

app.listen(PORT, () => {
    console.log(`House Hunter server listening on port ${PORT}`);
})