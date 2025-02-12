require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
var cors = require('cors')
const connectDB = require('./config/db');

const setupSwagger = require("./swaggerConfig")


const AuthRoutes = require('./routes/auth');
const CartRoutes = require('./routes/cart');
const OrderRoutes = require('./routes/order');
const ProductRoutes = require('./routes/product');

const app = express();
const PORT =process.env.PORT || 6000;

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json());


// Setup Swagger
setupSwagger(app);

// Connect to DB before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Routes
app.use("/api", AuthRoutes);
app.use("/api", CartRoutes);
app.use("/api", OrderRoutes);
app.use("/api", ProductRoutes);


