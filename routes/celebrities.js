var express = require('express');
var router = express.Router();
const Celebrity = require('../models/Celebrity');


/* GET '/' */
router.get('/', (req, res, next) => {

  Celebrity.find({})
    .then((allCelebrities) => res.render('celebrities', { allCelebrities }))
    .catch((err) => console.log(err));
});

/* GET '/:id' */
router.get('/details/:celebrityId', (req, res, next) => {
  const { celebrityId } = req.params;
  Celebrity.findById(celebrityId)
    .then((celebrity) => res.render('celebrity-details', { celebrity }))
    .catch((err) => console.log(err));
});


// GET '/celebrities/add'
router.get('/add', (req, res, next) => {
  res.render('celebrity-add');
});

// POST '/celebrities/add'
router.post('/add', (req, res, next) => {

  console.log('req.body', req.body);

  //Destructing
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });

  newCelebrity.save()
    .then((celebrity) => res.redirect('/celebrities'))
    .catch((err) => console.log(err));
});


//  GET '/celebrities/edit'
router.get('/edit', (req, res, next) => {
  const { _id } = req.query;

  Celebrity.findOne({ _id })
    .then((celebrity) => res.render('celebrity-edit', { celebrity }))
    .catch((err) => console.log(err));
});

//  POST '/celebrities/edit'
router.post('/edit', (req, res, next) => {
  const { _id } = req.query;

  //Destructing
  const { name, occupation, catchPhrase } = req.body;
  const newCelebrity = new Celebrity({ name, occupation, catchPhrase });

  Celebrity.findOneAndUpdate({ _id }, { $set: { name, occupation, catchPhrase } })
    .then((celebrity) => res.redirect('/celebrities'))
    .catch((err) => console.log(err));
});




//  GET '/celebrities/delete'
router.get('/delete', (req, res, next) => {
  const { _id } = req.query;

  Celebrity.findOne({ _id })
    .then((celebrity) => res.render('celebrities-delete', { celebrity }))
    .catch((err) => console.log(err));

  // Celebrity.deleteOne({ _id })
  //   .then(() => res.redirect('/celebrities'))
  //   .catch((err) => console.log(err));
});

//  POST '/celebrities/delete' */ DELETING from form
router.post('/delete', (req, res, next) => {
  const { _id } = req.query;

  Celebrity.deleteOne({ _id })
    .then((celebrity) => res.redirect('/celebrities'))
    .catch((err) => console.log(err));
});


module.exports = router;