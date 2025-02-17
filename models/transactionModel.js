const mongoose = require('mongoose')


const transactionSchema = new mongoose.Schema ({
         userid:{
            type:String,
            required:[true,'User is Required']
         },
        amount: {
           type:Number,
           required:[true,'Amount is Required']
        },
        category:{
            type:String,
           required:[true,'Category is Required']
        },
        type:{
            type:String,
           required:[true,'Type is Required'] 
        },
        refrence:{
            type:String
        },
        description:{
            type:String,
           required:[true,'description is Required']
        },

        date:{
            type:Date,
           required:[true,'date is Required']
        }
},{timestamps:true})


const transactionmodel = mongoose.model('transaction',transactionSchema)
module.exports = transactionmodel