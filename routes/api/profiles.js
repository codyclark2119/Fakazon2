const router = require('express').Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/profile');

// @route    GET api/profiles/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user'
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profiles
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('address', 'Address is required')
        .not()
        .isEmpty(),
      check('payment', 'Payment is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { street, apt, city, state, zip } = req.body.address;
    const { cardnumber, cardexp, cardccv } = req.body.payment;
    const {
      cardstreet,
      cardapt,
      cardcity,
      cardstate,
      cardzip
    } = req.body.payment.cardaddress;

    // Build profile object
    const profileFields = {
      address: {},
      payment: {}
    };
    profileFields.user = req.user.id;
    if (street) profileFields.address.street = street;
    if (apt) profileFields.address.apt = apt;
    if (city) profileFields.address.city = city;
    if (state) profileFields.address.state = state;
    if (zip) profileFields.address.zip = zip;

    // Build Payment object
    if (cardnumber) profileFields.payment.cardnumber = cardnumber;
    if (cardexp) profileFields.payment.cardexp = cardexp;
    if (cardccv) profileFields.payment.cardccv = cardccv;

    profileFields.payment.cardaddress = {};
    if (cardstreet) profileFields.payment.cardaddress.cardstreet = cardstreet;
    if (cardapt) profileFields.payment.cardaddress.cardapt = cardapt;
    if (cardcity) profileFields.payment.cardaddress.cardcity = cardcity;
    if (cardstate) profileFields.payment.cardaddress.cardstate = cardstate;
    if (cardzip) profileFields.payment.cardaddress.cardzip = cardzip;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
