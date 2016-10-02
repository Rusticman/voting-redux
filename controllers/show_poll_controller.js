const User = require('../model/user');

module.exports = function(req,res,next){
  const pollID = req.params.pollID;console.log('this is the request:',req)

  User.find({},{"polls":1,"_id":0},function(err,polls){
if(err){
  return next(err);
}
console.log('fetched poll')
const result = [];
  polls.forEach(function(userPolls){
  return  userPolls.polls.forEach(function(item){
        return result.push(item)
  })

})

var poll = result.filter(function (poll) {
    return poll._id.toString() === pollID;
  }).pop();


  res.send({poll:poll});


  })


}
