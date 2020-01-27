const router = require('express').Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Cart = require('../models/cart');

// @route    GET api/carts/me
// @desc     Get cart by ID
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.item'
    });
    if (!cart) {
      return res.status(400).json({ msg: 'There is no cart for this user' });
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    PUT api/carts
// @desc     Create/update cart
// @access   Private
router.put(
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

    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      const useritems = req.body.items;
      try {
        const newCart = new Cart({
          user: req.user.id,
          items: useritems
        });

        const cart = await newCart.save();
        if (cart){
          const userCart = await Cart.findOne({ user: req.user.id }).populate({
            path: 'items.item'
          });
          res.json(userCart);
        }
        else{
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    } else {
      try {
        const item = req.body.items;
        cart.items.push(item);
        await cart.save();
        const newCart = await Cart.findOne({ user: req.user.id }).populate({
          path: 'items.item'
        });
        res.json(newCart);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  }
);

// @route    DELETE api/carts/:id
// @desc     Delete item by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items');

    if (!cart) {
      return res.status(400).json({ msg: 'There is no cart for this user' });
    }
    const item = cart.items.find(item => item.id === req.params.id);
    if (!item) {
      return res.status(400).json({ msg: 'There is no item in this cart' });
    }
    await item.remove();
    const newCart = await Cart.findOne({ user: req.user.id }).populate('items');
    res.json(newCart);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/carts/
// @desc     Delete full cart
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.user.id }).populate(
      'items'
    );

    if (!cart) {
      return res.status(400).json({ msg: 'There is no cart for this user' });
    }

    res.json({ msg: 'Cart Deleted' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
