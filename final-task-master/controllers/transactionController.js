const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const account = require('../models/account');
const transaction = require('../models/transaction');
const { successResponse, errorResponse } = require('../utils');

const addAccount = async (req, res) => {
  try {
    const { username, emailID, accType, balance } = req.body;

    // checking if account allready exist or not 
    const userData = await account.findOne({ emailID: emailID, accType: accType });
      if (userData) {
        return errorResponse(req, res, 'you allready have account', 400);
      }
      else {

        // creating payload
        const payload = {
          username,
          emailID,
          accNumber: uuidv4(),
          accType,
          balance,
        };

        // insert account payload in database
        newAccount = new account(payload);
        const insertAccount = await newAccount.save();
        console.log('account created successful');

        return successResponse(req, res, insertAccount, 200);
      }

  } catch (error) {
    console.log(error.message);
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};

const newTransaction = async (req, res) => {
  try {
    let senderData, receiverData, senderAmount, receiverAmount;
    const { fromAccountId, toAccountId, amount } = req.body;

    try {

      // finding sender's account data
      senderData = await account.findOne({ accNumber: fromAccountId });
      if (!senderData) {
        return errorResponse(req, res, "account not found", 400);
      }

      // finding receiver's account data
      receiverData = await account.findOne({ accNumber: toAccountId });
      if (!receiverData) {
        return errorResponse(req, res, "account not found", 400);
      }

    } catch (error) {
      return errorResponse(req, res, "something went wrong", 400, {
        err: error,
      });
    }

    // checking that transaction not happening in same user's accounts
    if (senderData.emailID == receiverData.emailID) {
      return errorResponse(req, res, "transaction not possible within same user's account", 400);
    }

    //checking sender have sufficinent balance for the transaction or not
    if (senderData.balance < amount) {
      return errorResponse(req, res, "you dont have suffient balance", 400);
    }

    // checking for basic savings account limit shold not esceeded
    if (
      receiverData.accType == "Basic Savings" && receiverData.balance + amount > 50000
    ) {
      return errorResponse(req, res, "basic savings account limit exceeded", 400);
    }

    try {
      // updating amount after transaction

      senderAmount = await account.findOneAndUpdate({accNumber: fromAccountId}, {
        balance: Number(senderData.balance) - Number(amount),
      }, { returnOriginal: false } );
      
      receiverAmount = await account.findOneAndUpdate( { accNumber: toAccountId }, {
          balance: Number(receiverData.balance) + Number(amount),
        }, { returnOriginal: false });
      

    } catch (error) {
      console.log('second ' + error.message);
      return errorResponse(req, res, "something went wrong", 400);
    }

    // calculating user's all accounts balance
    const receiverAllAcc = await account.find({ emailID: receiverData.emailID});
    
    let totalBalance = 0;
    for(let i = 0; i< receiverAllAcc.length; i++){
      let finalBalance= Number(totalBalance);
      let addedBalance = Number(receiverAllAcc[i].balance);
      totalBalance = finalBalance + addedBalance;
    }

    // saving data into transaction table
    const transactionPayload = {  
      fromAccountId,
      toAccountId,
      amount
    };

    // insert account payload in database
    const newTransaction = new transaction(transactionPayload);
    const insertDetails = await newTransaction.save();

    return successResponse(
      req,
      res,
      {
        newSrcBalance: senderAmount.balance,
        totalDestBalance: totalBalance,
        transferedAt: Date(),
      },
      200
    );
    
  } catch (error) {
    console.log('third' + error.message);
    return errorResponse(req, res, "something went wrong", 400, { err: error });
  }
};

const viewTransaction = async (req, res) => {
  try {

    const transactionData = await transaction.find();

    // check if any transaction is exist or not
    if (!transactionData) {
      return errorResponse(req, res, "Task Not Found", 404);
    } else {
      return successResponse(req, res, transactionData, 200);
    }

  } catch (error) {
    return errorResponse(req, res, 'something went wrong', 400, { err: error });
  }
};


module.exports = { addAccount, newTransaction, viewTransaction };
