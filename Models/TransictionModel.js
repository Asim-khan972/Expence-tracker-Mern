// models/Transaction.js
const mongoose = require('mongoose');

// Define the transaction schema
const transactionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true,"please add some text"],
    trim: true, // Trim whitespace from the input string
  },
  amount: {
    type: Number,
    required: [true,"please add a positive or Negative number"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model for the transaction schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
