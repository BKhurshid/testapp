

//var uri = 'mongodb:// localhost/ mean-book';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Line 5 or line 10. Not both. 
/*mongodb:// username:password@ hostname:port/ database
*/

// Since you're connecting to a local instance, you can skip the username and password and use the following URI: 

/*mongodb:// localhost/ mean-book    */
//not sure what the /test is about
var uri = 'mongodb://localhost/test'; 
var db = require('mongoose'). connect(uri);

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


userSchema.methods.speak = function () {
  var greeting = this.username? "Meow name is " + this.username: "I don't have a name";
  console.log(greeting);
}
/*
Old version that we ended up not using.
var menteeSchema = new Schema({
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

 var Joseph = new User({
  username: "JosephSun",
  firstname: "Bazz",
  lastname: "Khurshid",
  password: "YouKnowz", 
  officeHours: "9-10",
  angular: "65", 
  node: "70", 
  javascript: "80", 
  interest: "Databases, Augmented reality, Big Data"
 });

console.log("Joseph is speaking",Joseph.speak());
 Joseph.save(function (err, Joseph) {
   if (err) return console.error(err);
   console.log("This is joseph", Joseph);
   Joseph.speak();
 });
/*Ultimate Product

module.exports = {
 User : mongoose.model("User", userSchema)
};
*/



