var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  res.render('lobby', { id: id });
});

module.exports = router;