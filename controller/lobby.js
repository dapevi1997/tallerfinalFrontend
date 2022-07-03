/**
 * Importación del módulo express.
 */
var express = require('express');
/**
 * Llamado de la función Router de express.
 */
var router = express.Router();

/**
 * API GET que lleva a la página principal de la aplicación.
 * @Param id Id del lobby
 * @Param idGamer Id del jugador
 */
router.get('/:id/:idGamer', function(req, res, next) {
  const id = req.params.id;
  const idGamer = req.params.idGamer;
  res.render('lobby', { id: id, idGamer:idGamer, title: 'Bingo' });
});

module.exports = router;