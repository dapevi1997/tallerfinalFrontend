var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/game/:id', function(req, res, next) {
 const id= req.params.id;
  res.render('start', { id: id });
});

module.exports = router;