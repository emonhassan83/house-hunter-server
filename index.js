const express = require('express');
const dbConnect = require('./config/dbConnect');
// const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandler');

//* connection to MongoDB
dbConnect();

//* middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//* ROUTES
app.use('/api/user', authRouter);

app.use(notFound);
app.use(errorHandler);

app.use('/', (req, res)=> {
    res.send("Hello from House Hunter server side!");
})

app.listen(PORT, () => {
    console.log(`House Hunter server listening on port ${PORT}`);
})