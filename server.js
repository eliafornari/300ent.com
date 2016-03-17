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
// app.use(app.router);
// app.use(function(req, res) {
//   // Use res.sendfile, as it streams instead of reading the file into memory.
//   res.sendFile(__dirname + '/public/index.html');
// });

// Prismic.Api('https://threehundred.prismic.io/api', function (err, Api) {
//     // You can use the Api object inside this block
//     console.log("References: ", Api.data.refs);
//     console.log("hello");
// });



// Prismic.api("http://threehundred.prismic.io/api", function(error, api) {
//   api.query("", function(error, response) { // An empty query will return all the documents
//     if (error) {
//       console.log("Something went wrong: ", err);
//     }
//     console.log("Documents: ", response.documents);
//   });
// });


// Prismic.Api('https://threehundred.prismic.io/api', function (err, Api) {
//     Api.form('everything')
//         .ref(Api.master())
//         .query(Prismic.Predicates.at("document.type", "artist")).submit(function (err, response) {
//
//
//
//           var Data = response;
//           console.log(response);
//             // The documents object contains a Response object with all documents of type "product".
//             var page = response.page; // The current page number, the first one being 1
//             var results = response.results; // An array containing the results of the current page;
//             // you may need to retrieve more pages to get all results
//             var prev_page = response.prev_page; // the URL of the previous page (may be null)
//             var next_page = response.next_page; // the URL of the next page (may be null)
//             var results_per_page = response.results_per_page; // max number of results per page
//             var results_size = response.results_size; // the size of the current page
//             var total_pages = response.total_pages; // the number of pages
//             var total_results_size = response.total_results_size; // the total size of results across all pages
//               return results;
//         });
//   });





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


// app.get('/about', function(req, res){
//   res.sendFile('about/about.html');
// });

app.listen(9000);
