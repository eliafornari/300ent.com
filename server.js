var express = require('express');
var app = module.exports = express();
var routes  = require('./routes');
// var ejs = require('ejs');
var path = require('path');


// app.use(require('prerender-node').set('prerenderToken', '7n7shQ7U4CB9eOaftUfv'));


app.engine('html', require('ejs').renderFile);

app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use("/stylesheet",  express.static(__dirname + '/public/stylesheet'));
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/assets", express.static(__dirname + '/public/assets'));



// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


app.listen(9000, function () {
  console.log('istening on port 9000');
});
