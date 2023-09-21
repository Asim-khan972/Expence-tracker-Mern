// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const transactionRoutes = require("./routes/transictionRoutes")
const ConnectDB = require("./config/Db")

// Load environment variables from .env
dotenv.config();

// Create an Express app
const app = express();

app.use(express.json())

ConnectDB()
// Middleware for logging using Morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use("/api/v/transaction", transactionRoutes)

// Set the port from the environment variable or use a default (e.g., 3000)
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});
