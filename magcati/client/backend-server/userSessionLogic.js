/*
There are two broad ways of implementing sessions in Express, using cookies and using a session store at the backend. Both of them add a new object in the request object named session, which contains the session variables. I plan to use the session store at the backEnd but if there are any objections we can discuss using cookies. 
​
*/

var express = require('express');

//pretty sure this is dependent on a cookieparser middleware. So most likely need to require cookie-parser.
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(express)
var app = express();

/*
Stuff that we need to discuss as I don't understand the need for an engine for us. 
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
*/

/*We would need to add the correct implementation of a User model. Which would take the place of a Mentor/Mentee*/
var User = require('database'). model('User');

/*
Here ‘secret‘ is used for cookie handling etc but we have to put some secret for managing Session in Express.
​
Need to have a store variable, otherwise we will use express session default store, MemoryStore. MemoryStore uses the application RAM for storing session data and works right out of the box, without the need for any database.
​
Should  not use MemoryStore for the following reasons:
1. Memory consumption will keep growing with each new session.
2. Not persistent.
*/
app.use(express.session({
    key: 'app.sess',
    store: new MongoStore({//https://github.com/kcbanner/connect-mongo
        db: 'myapp',
        host: '127.0.0.1',
        port: 3355
        }),
    secret: 'SEKR37'
}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

var userSession;
//the '/' route is not the route we would want to use this logic for. 
app.get('/',function(req,res){
    //req.session is our session middleware
    //Session set when user requests our app via URL
    userSession=req.session;
/*                             
Session variables are those variables, which you associate with a user session. These variables are independently set for each user and can be accessed on the session property of the request object – req.session.
​
example : req.session['primary skill'] = 'Dancing';
​
While it might look like we are dealing a JavaScript object, it is not completely true; the session variables actually reside in the data store of the session and the JavaScript object only works as a proxy for those values.
Operations on session variables are is basically working with JavaScript objects. The states of these objects are then updated on the session store.
*/
    //This line will check the users session's existence. In other words, if the user is signed in. We would want to do this for profile page. 
    if(userSession.email){
    /*                      ^session variable
    * 
    * If it existed will do some action.We would want to give their data to the client and then have frontEnd routing take them to their profile page or something. 
    */
        res.redirect('/profilePage');
    }
    else{
        //here we would make direct them to the login page  if they are not logged in. The way I wrote it assumes backEnd rendering but given our choice to do client side routing we would do the rendering on the front end.
        res.render('loginPage.html');
    }
});

app.post('/login',function(req,res){
    //some logic to check the email and password are in the database.
    //create session
    userSession=req.session;
    //In this we are assigning email to sess.email variable.
    //email comes from client side .
    userSession.email=req.body.email;
    res.end('done');
});

app.get('/logout',function(req,res){
    /*
Session store-based sessions has a method called destroy(), which is used for destroying sessions from the session store – the proper way of tearing down a session store-based session. Takes a optional callback 
    */
    //destroy the session and then do the function.
    req.session.destroy(function(err){
        //if err
        if(err){
            //log err
            console.log(err);
        }
        //else
        else{
            //redirect user to route '/'. Will need to change as we will probably just choose to send boolean info to front end and have that render a certain page. 
            res.redirect('loginPage');
        }
    });
});

app.listen(3000,function(){
console.log("App Started on PORT 3000");
});