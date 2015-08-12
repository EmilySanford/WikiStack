var express = require('express');
var router = express.Router();
var models = require('../models/');
var Page = models.Page; 
var User = models.User; 

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function(req, res, next){
	res.redirect('/');
});


router.post('/', function(req,res,next){
 var title = req.body.title;
 var content = req.body.content;  var page = new Page({
   title: title,
   content: content
   // urlTitle: urlTitleGen(title)
 });  page.save()
   .then(function(page){
     res.redirect(page.route);
   })
   .then(null, function (err){
     console.error(err);
   });
}); 

// router.post('/', function(req, res, next){
// 	console.log(req.body);
// 	var page = new Page({
//     	title: req.body.title,
//    	 	content: req.body.content
//   });
// 	  page.save()
// 	  // 	function(err, page){
// 	  // 	console.log(page);
// 	  // 	if (err) next(err);
// 	  // 	else res.json(page);
// 	  // })
// 	  .then(function(savedPage){
// 	  	console.log("Hello");
// 	  	console.log(savedPage.route);
//   		res.redirect(savedPage.route); // route virtual FTW
// }).then(null, next);
	  
// });



router.get('/add', function(req, res, next){
	res.render( 'addpage')
	//res.send('got to GET /wiki/add');
});

router.get('/:urlTitle', function(req, res, next){
	//console.log(req.params)
	Page.findOne({ urlTitle: req.params.urlTitle}).exec().then(function(foundPage){
		res.render('wikipage', foundPage);
	}).catch(next);
	//res.send('hit dynamic route at ' + req.params.urlTitle);
})

module.exports = router;


// res.render( 'addpage', { 
// 		authorName: Page.author,
// 		authorEmail: User.email,
// 		content: Page.content

// 	}
// 		)



function generateUrl(str){
	if (typeof title !== 'undefined' && title !== ''){
		str = str.replace(/[\s+]/g, "_").replace(/[^a-z0-9\_]/gmi, "");
	} else {
		return Math.random().toString(36).substring(2, 7);
	}
	
};

generateUrl("HI PEOPLE")