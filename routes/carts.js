const router = require('express').Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Cart = require('../models/cart');

// @route    GET api/carts/me
// @desc     Get cart by ID
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('item');

    if (!cart) {
      return res.status(400).json({ msg: 'There is no cart for this user' });
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('items', 'items is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { useritems } = req.body.items;
    try {
      const newCart = new Cart({
        user: req.user.id,
        items: [useritems]
      });

      const cart = await newCart.save();

      res.json(cart);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
