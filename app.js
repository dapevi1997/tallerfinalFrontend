/**
 * Importación del módulo http-errors.
 */
var createError = require('http-errors');
/**
 * Importación de express.
 */
var express = require('express');
/**
 * Importación de path.
 */
var path = require('path');
/**
 * Importación de cookie-parser.
 */
var cookieParser = require('cookie-parser');
/**
 * Importación de morgan.
 */
var logger = require('morgan');
/**
 * Importación de la librería mongoose para gestionar la base de datos en MongoDB.
 */
const mongoose = require('mongoose');
/**
 * Conexión a MongoDB
 */
const mongodb = 'mongodb://localhost/users';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MondoDB conectada'))
  .catch(err => { console.log(err) });


/**
 * Guardado en variable del módulo express.
 */
var app = express();

/**
 * Configurando el motor de vistas.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
/**
 * Configuraciones adicionales para la aplicación.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Rutas para conectar las APIS.
 */
app.use('/', require('./controller/index'));
app.use('/user', require('./controller/find-user'));
app.use('/user', require('./controller/save-user'));
app.use('/user', require('./controller/register'));
app.use('/lobby', require('./controller/lobby'));
app.use('/start', require('./controller/start'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
