const User = require("../model/user");

const Product = require("../model/products");

module.exports.getProducts = async function(req, res){
    await Product.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}
module.exports.searchProducts = async function(req, res){
    let payload = req.body.content.trim();
    await Product.find({product_name: {$regex: new RegExp('^'+payload+'.*','i')}}).exec()
    .then(result=>res.json({
        result,
        content:req.body.content
    }))
    .catch(err=>res.json(err))
}
