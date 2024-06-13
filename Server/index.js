const express = require("express");

const port = 4004;

const app = express();

const NODE_ENV = 'production';

const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/KLS_DigiBuy");

const passportJWT = require("./config/jwt_strategy");   

const path = require("path");

const __dirname1 = path.resolve();

if(NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname1,'/Client/build')))

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"Client","build","index.html"));
    })
}
else{
    app.get("/",function(req,res){
        res.send("App running Successfully")
    })
}


const db = mongoose.connection;

db.once('open',()=>{
    console.log("Connected to database :: MongoDB")
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

app.use("/",require("./routes"));

app.listen(port, (err)=>{
    if(err){
        console.log("Error in running server",err);
        return;
    }
    console.log("Server up and running on port number",port);
});