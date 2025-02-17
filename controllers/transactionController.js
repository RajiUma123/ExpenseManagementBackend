const transactionmodel = require("../models/transactionModel")
const moment = require('moment')

const getAllTransaction = async(req,res)=>{
       try {
         const {frequency,selecteDate,type}=req.body
        const gettransaction= await transactionmodel.find
        ({
           ...(frequency !== 'custome' ?{
            date:{
               $gt: moment().subtract(Number(frequency),"d").toDate(),
            },
           }:{
            date:{
               $gte: selecteDate[0],
               $lte: selecteDate[1]
            }
           }),
            userid:req.body.userid,
            ...(type !== 'all' && {type})
         })
          res.status(200).json(gettransaction)
       } catch (error) {
        res.status(500).json(error)
       }

}


const deleteTransaction=async(req,res)=>{
   try {
      await transactionmodel.findByIdAndDelete({_id:req.body.transactionId})
      res.status(201).send("deleted Successfully")
   } catch (error) {
      res.status(500).send("Unable to delete record")
   }

}


const  addTransaction =async(req,res)=>{
   try {
     const newtransaction = new transactionmodel(req.body)
        await newtransaction.save()
        res.status(201).send("Transaction Created")
   } catch (error) {
    res.status(500).json(error)
   }
}

const editTransaction = async(req,res)=>{
   try {
      await transactionmodel.findOneAndUpdate(
         {_id: req.body.transactionId},
         req.body.payload
      );
      res.status(201).send("Transaction Updated Successfully")
   } catch (error) {
      res.status(500).json(error)
      
   }
}


module.exports = {getAllTransaction,addTransaction,editTransaction,deleteTransaction}