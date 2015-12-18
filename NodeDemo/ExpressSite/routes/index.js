
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', {"book": {"name": "computer", "price": 12.99},
                       "basic":{ title: 'Express',name:'Jack' },
                       "items":["itemA","itemB","itemC"]});
};