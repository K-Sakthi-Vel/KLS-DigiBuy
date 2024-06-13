const User = require("../model/user");
const Seller = require("../model/seller");
const JWT = require("jsonwebtoken");

module.exports.home = async function(req, res){
    return res.send("Hiiiii")
}

module.exports.register = async function(req, res){
    try{
        
        if(req.body.data.usertype === "User"){
            await User.create({
                username:req.body.data.username,
                email:req.body.data.email,
                password:req.body.data.password
            })
            .then(result=>res.json(result))
            .catch(err => res.json(err))
        }
        else if(req.body.data.usertype === "Seller"){
            await Seller.create({
                sellername:req.body.data.username,
                email:req.body.data.email,
                password:req.body.data.password
            })
            .then(result=>res.json(result))
            .catch(err => res.json(err))
        }

    }
    catch(err){
        console.log(err)
        res.json(err);
    }
}

module.exports.signin = async function(req, res){
    try{
        if(req.body.data.usertype === "User"){
            const user = await User.findOne({email:req.body.data.email});
            if (user.password === req.body.data.password){
                let token = JWT.sign(user.toJSON(), "ragasiyam", {expiresIn:"100000"});
                res.setHeader('Authorization', 'Bearer '+ token);
                res.json({
                    username:user.username,
                    email:user.email,
                    usertype:"User"
                })
            }
            else{
                res.json({username:""})
            }
        }
        else if(req.body.data.usertype === "Seller"){
            const seller = await Seller.findOne({email:req.body.data.email});
            if (seller.password === req.body.data.password){
                let token = JWT.sign(seller.toJSON(), "ragasiyam", {expiresIn:"100000"});
                res.setHeader('Authorization', 'Bearer '+ token);
                res.json({
                    sellername:seller.sellername,
                    email:seller.email,
                    usertype:"Seller"
                })
            }
            else{
                res.json({username:""})
            }
        }

    }
    catch(err){
        console.log(err)
    }
}
