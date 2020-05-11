const router = require('express').Router();
const Item = require('../../models/item');

// Matches with "/api/items"
router
  .route('/')
  .get(function(req, res) {
    Item.find(req.query)
      .sort({ dateAdded: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
  .post(function(req, res) {
    Item.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

// Matches with "/api/items/:id"
router
  .route('/:id')
  .get(function(req, res) {
    Item.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
  .put(function(req, res) {
    Item.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
  .delete(function(req, res) {
    Item.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

router.route('/search/').post(function(req, res) {
  Item.find({ name: new RegExp(req.body.query, 'i') })
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err));
});

router.route('/category/').post(function(req, res) {
  Item.find({ category: req.body.query })
    .then(dbModel => {
      res.json(dbModel);
    })
    .catch(err => res.status(422).json(err));
});

module.exports = router;
