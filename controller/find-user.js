/**
 * Importación del módulo express.
 */
var express = require('express');
/**
 * Llamado de la función Router de express.
 */
var router = express.Router();
/**
 * Imporatacion el modelo que guarda las credenciales de los jugadores.
 */
const User = require('../models/user');

/**
 * API GET busca un email en la base de datos MongoDB.
 * @Param email email que se desea buscar.
 */
router.get('/find/:email', async (req, res, next) => {

  const email = req.params.email;
  const data = await User.findOne({ email: email }).exec();
 
  res.json( data ); // retorna null si no lo encuentra

});

module.exports = router;
