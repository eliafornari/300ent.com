var express = require('express');
var app = express();
// var ejs = require('ejs');
var prerender =require('prerender-node');
var https = require('https');
var path = require('path');
var Prismic = require('prismic.io');

// app.engine('html', ejs).renderFile);

// app.set('view engine', 'html');

app.engine('html', require('ejs').renderFile);


app.use(require('prerender-node').set('prerenderToken', '7n7shQ7U4CB9eOaftUfv'));

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  // res.redirect('/index.html');


});

app.get('/contact', function(req, res){
  // res.redirect('contact/contact.html');
  res.redirect('//');
  // res.sendFile(path.join(__dirname, '../public', '/contact/contact.html'));
});
//
// app.all('*', function (req, res, next) {
//   console.log('Accessing the secret section ...');
//   // next(); // pass control to the next handler
// });

app.get('/projects', function(req, res){
  // res.sendfile(__dirname + '/public/index.html');
  res.redirect('/');
});

app.get('/privacy', function(req, res){
  res.sendfile(__dirname + '/public/contact/privacy.html');
  // res.redirect('/privacy');
});


app.get('/stories', function(req, res){
  // res.sendfile(__dirname + '/public/index.html');
  res.redirect('/');
});

app.get('/about', function(req, res){
  res.redirect('/');
  // res.sendFile(path.join(__dirname, '../public', '/contact/contact.html'));
});

app.get('/life', function(req, res){
  res.redirect('/');
  // res.sendFile(path.join(__dirname, '../public', '/contact/contact.html'));
});

app.get('/*', function(req, res){
  res.redirect('/');
  // res.sendFile(path.join(__dirname, '../public', '/contact/contact.html'));
});

// app.all('/secret', function (req, res, next) {
//   console.log('Accessing the secret section ...');
//   next(); // pass control to the next handler
// });


app.listen(9000);
