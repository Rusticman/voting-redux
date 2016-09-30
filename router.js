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


module.exports = function(app){
/*
  app.get('/',requireAuth,function(req,res){
    res.send({success:"true"})

  })*/
  app.post('/signin', requireSignin,Authentication.signin);
  app.post('/signup',Authentication.signup)
  app.post('/createpoll',CreatePoll);
  app.get('/mypolls/:userID', MyPolls);
  app.get('/viewpolls',AllPolls);
  app.get('/showpoll/:pollID',ShowPoll);
  app.put('/vote',Vote);
  app.get('/hasvoted/:pollID/:userID',HasVoted);
  app.post('/newitem',AddNewItem);
}
