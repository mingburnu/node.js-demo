
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

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

//開啟或建立mongodb資料庫
mongoose.connect('mongodb://localhost/MyDB');

//建立Schema
var UserSchema = new mongoose.Schema({
   name:String,
   email:String,
   age:Number
}),
    Users = mongoose.model('Users',UserSchema);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
app.get('/users', user.list);

//顯示所有使用者
app.get("/",function(req,res){
    //搜尋
    Users.find({},function(err,docs){  //{}表示取出所有Users
        res.render('index',{users:docs});
    }); 
})

//新增頁面
app.get('/new', function(req,res){
   res.render("new");
})

//新增
app.post("/new",function(req,res){
    var b = req.body;
    new Users({
       name: b.name,
       email:b.email,
       age:b.age
    }).save(function(err, user){
       if(err) res.json(err);
       res.redirect("/");
    })
})

//編輯
app.get('/edit/:name', function(req,res){
   Users.find({"name":req.params.name},function(err,users){  
        res.render('edit',{user:users[0]});
    }); 
})

//修改
app.put('/:name', function(req,res){
   var b = req.body;
   Users.update(
     {name:req.params.name},
     { name: b.name,
       email:b.email,
       age:b.age},
     function(err){
       res.redirect("/");
   });
});

//刪除
app.get('/delete/:name', function(req,res){
   Users.remove({name:req.params.name},
     function(err){       
       res.redirect("/");
   });
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
