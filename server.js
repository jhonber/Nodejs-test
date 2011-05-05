
/**
 * Module dependencies.
 */
/*Importo la libreria express(Framework)*/
var express = require('express');

/*Se crea el servidor*/
var app = module.exports = express.createServer();

// Configuration
app.configure(function(){
  /*Indicamos que las vistas estan en el directorio /views*/
  app.set('views', __dirname + '/views');
  /*Indicamos que vamos a usar el motor de plantallas Jade*/
  app.set('view engine', 'jade');
  /*Se deben usar por buenas practicas*/
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Configuracion de los ambientes de desarrollo
//development
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.logger({format:':remote-addr :method :url :status :user-agent :response-time'}))
});
//production
app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
// Se manejas las peticiones a las rutas, deacuerdo a la ruta solicitada
// una funcion se encarga de manejar cada peticion
app.get('/', function(req, res){
  res.render('index', {
    title: 'jhonber\'s Site'
  });
});

/*app.get('/como', function(req, res){
  res.render('kumokojo/como', {layout:false})
});
*/

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d", app.address().port);
}
