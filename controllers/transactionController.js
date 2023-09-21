const Transaction = require("../Models/TransictionModel")

// transactionController.js
exports.getTransactions = async(req, res) => {
 
  try {
    const transactions = await Transaction.find()
    console.log(transactions)

    return res.status(200).json({
        success : true, 
        data : transactions
    })
  } catch (error) {
    return res.status(500).json({
        success : false , 
        err : "server Error", 
        error
    })
  }
};



exports.addTransactions = async(req, res) => {
 

     const {text , amount}= req.body;
  try {
    const transaction = await Transaction.create(req.body)
    console.log(transaction)

    return res.status(201).json({
        success : true, 
        data : transaction
    })
  } catch (error) {
    return res.status(500).json({
        success : false , 
        error
    })
  }
};





exports.deleteTransactions = async(req, res) => {
  
     try {
    const transaction = await Transaction.findById(req.params.id)
    console.log(transaction)

    ////// if not found 

    if(!transaction){
       return res.status(404).json({
        success : false, 
        message : "Transaction not found "})}



    await transaction.deleteOne()

    return res.status(201).json({
        success : true, 
        error : "Transaction deleted Successfully "
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
        success : false , 
        error
    })
  }
};