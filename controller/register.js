/**
 * Importación del módulo express.
 */
var express = require('express');
/**
 * Llamado de la función Router de express.
 */
var router = express.Router();

/**
 * API GET que lleva a la página de registro de la aplicación.
 */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

module.exports = router;