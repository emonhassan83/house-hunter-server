const express = require('express');
const dbConnect = require('./config/dbConnect');
// const dbConnect = require('./config/dbConnect');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const authRouter = require('./routes/authRoutes');
const ownerHouseRouter = require('./routes/onwerHouseRoutes');
const houseRenterRouter = require('./routes/renterBookingRoutes');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleware/errorHandler');

//* connection to MongoDB
dbConnect();

//* middleware

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//* ROUTES
app.use('/api/user', authRouter);
app.use('/api/house-owner', ownerHouseRouter);
app.use('/api/house-renter', houseRenterRouter);

app.use('/', (req, res)=> {
    res.send("Hello from House Hunter server side!");
})

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`House Hunter server listening on port ${PORT}`);
})