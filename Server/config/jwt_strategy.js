const passport = require("passport");

const JWTStrategy = require("passport-jwt").Strategy;

const extractJWT = require("passport-jwt").ExtractJwt;

const User = require("../model/user");

let options = {
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'ragasiyam'
}

passport.use(new JWTStrategy(options, function(jwtPayload, done){
    User.findById(jwtPayload._id, (err, user)=>{
        if (err){
            console.log("Error in finding user",err);
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false)
        }
    })
}));

module.exports = passport;