const passport = require('passport');
const config = require('../config');
const User = require('../model/user');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('../config.js');


///////////////////////LOCAL STRATEGY\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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

//////////////////////////JWT STRATEGY\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

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

  User.findById(payload.sub, function(err,user){//sub property given in authentication.js
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

///////////////////////////FACEBOOK STRATEGY\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const facebookStrategy = new FacebookStrategy({

        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL
    },
    function(token,refreshToken,profile,done){
      console.log('hey im the profile:',profile)
        process.nextTick(function(){


            User.findOne({"facebook.id":profile.id},function(err,user){

                if(err){
                    console.log('error retreiving user')

                }
                else if(user){
                    return done(null, user);
                }
                else{

                    const facebookObject = {
                        "id"           : profile.id//this is used to find the user in future sign ins
                        };


                const User = new User({
                  "userName":profile.name.givenName,
                  "email":profile.emails[0].value,
                  "facebook":facebookObject
                });


                    User.save(function(err){
                      if(err){
                        console.log('there was an error saving user')
                        throw err;
                      }
                    })

                    User.findOne({"facebook.id":profile.id},function(err,user){

                        if(err){
                            console.log('cannot find newly inserted facebook object');
                            throw err;
                        }else{
                            return done(null,user);
                        }
                    })
                }
            })
        })

    }


    )






//tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookStrategy);
