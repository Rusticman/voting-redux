const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');//necessary for passport to work
const passport = require('passport');

//this allows passport strategies to be used for authenticating user for protected routes (middleware)
const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false});


module.exports = function(app){

  app.get('/',requireAuth,function(req,res){
    res.send({success:"true"})

  })
  app.post('/signin', requireSignin,Authentication.signin);
  app.post('/signup',Authentication.signup)
}
