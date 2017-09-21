// New fortunes at lib/fortune.js
var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });

// Tell Express loading Handlebars 
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Set Port
app.set('port', process.env.PORT || 3000);

// Chai and Mocha Test
app.use(function(req, res, next) {
  res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
  next();
});

// Looks for files in Public Dir
app.use(express.static(__dirname + '/public'));

// Render looks in views for file name in extenstion

// Root Dir
app.get('/', function(req, res) {
  res.render('home');
});

// Date Dir
app.get('/datetime', function(req, res) {
  var date = new Date();
  res.render('datetime', { datetime: date});
});

//Old About Dir
//app.get('/about', function(req,res){
//   res.render('about', { fortune: fortune.getFortune() });
//});

// About Dir with Chai and Mocha
app.get('/about', function(req,res){
  res.render('about', { fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js'});
});


// custom 404 page 
app.use(function(req, res){ 
  res.status(404);
  res.render('404');
});

// custom 500 page
app.use(function(err, req, res, next){
  console.error(err.stack); 
  res.type('text/ plain'); 
  res.status(500);
  res.render('500');
});

// hood-river
app.get('/tours/hood-river', function(req, res){
	res.render('tours/hood-river');
});

// request group rate
app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

// Listen to APP for Port
app.listen(app.get('port'), function(){ console.log('Express started on http:// localhost:' + app.get('port') + '; press Ctrl-C to terminate.'); 
});


