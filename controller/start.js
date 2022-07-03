/**
 * Importación del módulo express.
 */
var express = require('express');
/**
 * Llamado de la función Router de express.
 */
var router = express.Router();

/**
 * API GET que lleva a la página de comienzo del juego.
 * @Param id Id del juego.
 * @Param idGamer Id del jugador.
 * @Param idLobby Id del lobby.
 */
router.get('/game/:id/:idGamer/:idLobby', function(req, res, next) {
 const id= req.params.id;
 const idGamer= req.params.idGamer;
 const idLobby = req.params.idLobby;
  res.render('start', { id: id, idGamer : idGamer , idLobby: idLobby, title: 'Bingo'});
});

module.exports = router;