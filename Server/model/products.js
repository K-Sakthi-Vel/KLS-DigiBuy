const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    sellername:{
        type:String,
        required:true
    },
    product_name:{
        type:String,
        required:true,
    },
    product_rating:{
        type:Number,
        required:true,
    },
    product_price:{
        type:Number,
        required:true,
    },
    product_category:{
        type:String,
        required:true,
    },
    filename:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const Products = mongoose.model("Products", productsSchema);

module.exports = Products;