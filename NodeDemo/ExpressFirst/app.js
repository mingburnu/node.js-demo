var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('<h2>第一個Express App的頁面</h2>');
});

app.listen(3000);

console.log("Express app 已經在 port 3000 啟動!\n");