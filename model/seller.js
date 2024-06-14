const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
    sellername:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Seller = mongoose.model("Seller", sellerSchema);

module.exports = Seller;