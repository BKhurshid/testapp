

//var uri = 'mongodb:// localhost/ mean-book';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Line 5 or line 10. Not both. 
/*mongodb:// username:password@ hostname:port/ database
*/

// Since you're connecting to a local instance, you can skip the username and password and use the following URI: 

/*mongodb:// localhost/ mean-book    */

var uri = 'mongodb:// localhost/ mean-book'; 
var db = require(' mongoose'). connect( uri);

var userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String, 
  officeHours: String,
  angular: String, 
  node: String, 
  javascript: String, 
  skill: String,
  interest: String
});

/*var menteeSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String, 
  officeHours: String,
  angular: String, 
  node: String, 
  javascript: String, 
  skill: String,
  interest: String
});


var mentorSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String, 
  angular: String, 
  node: String, 
  javascript: String, 
  skill: String,
  officehours: String,
  locaton: String
});

var Mentee = mongoose.model('Mentee', menteeSchema);

var Mentor = mongoose.model('Mentor', mentorSchema);
*/
var User = mongoose.model("User", userSchema);



