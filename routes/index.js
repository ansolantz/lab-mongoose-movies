var express = require('express');
var router = express.Router();


const celebritiesRouter = require('./celebrities');

//  * '/celebrities'
router.use('/celebrities', celebritiesRouter);


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
