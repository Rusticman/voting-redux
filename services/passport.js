const passport = require('passport');
const config = require('../config');
const User = require('../model/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//setup for local Strategy
const localOptions = {usernameField:"email"};//local strategy uses username and password by default
//so we change it
const localLogin = new LocalStrategy(localOptions, function(email,password,done){//email(was username)& password are by default the first two arguments
//verify username(email) and password, call done with user                        //strategy automatically looks for those two fields in request from client
//if unverified, call done with false

User.findOne({email:email}, function(err,user){
  if(err){
    return done(err);
  }
  if(!user){
    return done(null,false);
  }
  //compare passwords -  is 'password' equal to user.password?
  user.comparePasswords(password,function(err,isMatch){
    if(err){
      return done(err);
    }
    if(!isMatch){
      return done(null,false);
    }

    return done(null,user);
  })
})

})

//setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),//this tells strategy to find token in authorization header
  secretOrKey: config.secret//this is secret to decode the token
};

//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions,function(payload,done){
  //see if the userID in the payload(this is decoded JWT token which has sub & iat property) exists in our database
  //if it does call 'done'with that user
  //otherwise, call done without a user object

  User.findById(payload.sub, function(err,user){//sub property given in authenication.js
    if(err){
      return done(err,false);
    }

    if(user){
      done(null,user)//tells passport we found user and he is authenticated
    }
    else{
      done(null,false);//false means not authenticated
    }
  })
})

//tell passport to use these strategies
passport.use(jwtLogin)
passport.use(localLogin)
