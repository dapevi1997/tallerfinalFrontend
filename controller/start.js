var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/game/:id/:idGamer', function(req, res, next) {
 const id= req.params.id;
 const idGamer= req.params.idGamer;
  res.render('start', { id: id, idGamer : idGamer });
});

module.exports = router;