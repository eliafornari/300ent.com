"use strict"

let Prismic = require('prismic-nodejs');
let https = require("https");
let http = require("http");
let fs = require('fs');
let express = require("express");
let bodyParser = require('body-parser');
let routes  = require('./routes');
let path = require('path');
var util = require('util');
let request = require('request');
let ejs = require('ejs');
let PrismicConfig = require('./api/prismic/config.js');
let app = express();



app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
// app.use(function(req, res, next) {
//     if((!req.secure) && (req.get('X-Forwarded-Proto') !== 'https')) {
//         res.redirect('https://' + req.get('Host') + req.url);
//     }
//     else
//         next();
// });
app.use( express.static(__dirname + "/../client/assets/images") );
app.use(express.static('/../node_modules/jquery/dist/jquery.min.js'));
app.set('views', __dirname + '/../client');
app.use( express.static(__dirname + "/../client") );
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// This is the configuration for prismic.io
/*
 * Initialize prismic context and api
 */
app.use((req, res, next) => {
  Prismic.api(PrismicConfig.apiEndpoint, { req })
  // accessToken: PrismicConfig.accessToken,
  .then((api) => {
    req.prismic = { api };
    // res.locals.ctx = {
    //   endpoint: PrismicConfig.apiEndpoint,
    //   linkResolver: PrismicConfig.linkResolver
    // };
    next();
  }).catch((err) => {
    const message = err.status === 404 ? 'There was a problem connecting to your API, please check your configuration file for errors.' : `Error 500: ${err.message}`;
    res.status(err.status).send(message);
  });
});

// app.get('/api/tour/:artist/get', function(req, res){
//   tour.get(req, res);
// });

app.get('/api/prismic/press/get',(req, res) => {
  console.log("query");
  console.log(req.query);
var type = req.query.type;
var page = req.query.page;
var order = req.query.order;
var filter = req.query.filter;

var predicates =[
  Prismic.Predicates.at("document.type", type)
]


if(req.query.filter){
  predicates.push(Prismic.Predicates.at('document.tags', [filter]));
}


console.log(page);



  req.prismic
  .api.query(
      predicates,
      { orderings : '['+order+']', pageSize : 5, page : page }
  )
    .then((document) => {
      res.json( document );
    })
    .catch((err) => {
    // Don't forget error management
      res.status(500).send(`Error 500: ${err.message}`);
    });


});

// app.get('/api/prismic/',(req, res) => {
//   req.prismic
//   .api.getByUID('page', 'get-started')
//     .then((document) => {
//       res.json( document );
//     })
//     .catch((err) => {
//     // Don't forget error management
//       res.status(500).send(`Error 500: ${err.message}`);
//     });
// });



app.get('*', routes.index);
app.listen(8081, () => console.log("listening on 8081"));
