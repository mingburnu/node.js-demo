
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
function User(name, email, age) 
{
  
  this.name = name;
  
  this.email = email;

  this.age = age;
}





var users = [
    
    new User('Jack2', 'Jack@gmail.com', 20),
    new User('Mary2', 'Mary@gmail.com', 25),
    new User('Tom2', 'Tom@gmail.com', 30)

];

app.get('/', routes.index);

app.get('/test',function(req,res){
  res.render('test',{users:users})
})

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
