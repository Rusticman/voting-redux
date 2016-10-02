const Authentication = require('./controllers/authentication');
const CreatePoll = require('./controllers/create_poll_controller');
const MyPolls = require('./controllers/my_polls_controller');
const ShowPoll = require('./controllers/show_poll_controller');
const AllPolls = require('./controllers/all_polls_controller');
const Vote = require('./controllers/vote_controller');
const HasVoted = require('./controllers/has_voted_controller');
const AddNewItem = require('./controllers/new_item_controller');

const passportService = require('./services/passport');//necessary for passport to work
const passport = require('passport');

//this allows passport strategies to be used for authenticating user for protected routes (middleware)
const requireAuth = passport.authenticate('jwt',{session:false});
const requireSignin = passport.authenticate('local',{session:false});
const facebookSignin = passport.authenticate('facebook',{scope:[],session:false});

module.exports = function(app){


  app.post('/signin', requireSignin,Authentication.signin);
  app.post('/signup',Authentication.signup)
  app.post('/createpoll',requireAuth,CreatePoll);
  app.get('/mypolls/:userID',requireAuth, MyPolls);
  app.get('/viewpolls',requireAuth,AllPolls);
  app.get('/showpoll/:pollID',requireAuth,ShowPoll);
  app.put('/vote',requireAuth,Vote);
  app.get('/hasvoted/:pollID/:userID',requireAuth,HasVoted);
  app.post('/newitem',requireAuth,AddNewItem);
  app.get('/example',requireAuth,function(req,res,next){
    res.send({req:'hello'})
  });

/////Facebook routes
app.get('/auth/facebook',facebookSignin);

app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
          failureRedirect: "/",
            session:false
        }), function(req,res,next){

          res.send({success:"true"})
        });

}
