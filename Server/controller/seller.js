
const Product = require("../model/products")

module.exports.addProduct = async function(req, res){
    Product.create({
        sellername:req.body.data.sellername,
        product_name:req.body.data.name,
        product_rating:req.body.data.rating,
        product_price:req.body.data.price,
        product_category:req.body.data.category,
        filename:req.body.data.filename,
    })
    .then(result => res.json(result))
    .catch(err=>console.log(err))

}
module.exports.getProducts = async function(req, res){
    await Product.find({sellername:req.body.seller})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}

module.exports.editProduct = async function(req, res){
    console.log(req.body.data.id)
    await Product.findByIdAndUpdate(req.body.data.id,{
        "product_name":req.body.data.product_name,
        "product_price":Number(req.body.data.product_price),
        "product_rating":Number(req.body.data.product_rating)
        
    })
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}
module.exports.deleteProduct = async function(req, res){
    console.log(req.body.id)
    await Product.findByIdAndDelete(req.body.id)
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
}
