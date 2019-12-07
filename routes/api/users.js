const router = require("express").Router();
const db = require("../../models");
const bcrypt = require("bcrypt");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");

router
  .route("/")
  // @route    GET api/users
  // @desc     Test route
  // @access   Public
  .get(auth, async (req, res) => {
    try {
      const user = await db.User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  // @route    POST api/users
  // @desc     Register user
  // @access   Public
  .post(
    [
      check("username", "Username is required")
        .not()
        .isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check(
        "password",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { username, email, password } = req.body;

      try {
        let user = await db.User.findOne({ email });

        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "User already exists" }] });
        }

        user = {
          username,
          email,
          password
        };
        // Store hash in your password DB.
        const salt = await bcrypt.genSalt(13);
        user.password = await bcrypt.hash(password, salt);

        await db.User.create(user)
          .then(user => {
            const payload = {
              user: {
                id: user._id
              }
            };

            jwt.sign(
              payload,
              process.env.jwtsecret,
              { expiresIn: 360000 },
              (err, token) => {
                if (err) throw err;
                res.json({ token });
              }
            );
          })
          .catch(err => res.status(422).json(err));
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  )
  // @route    Put api/users/
  // @desc     Update user
  // @access   Private
  .put(auth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await db.User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: req.body },
        { new: true, upsert: true }
      );
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  // @route    Delete api/users/
  // @desc     Delete user
  // @access   Private
  .delete(auth, async (req, res) => {
    try {
      // Remove user
      await db.User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: "User deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

// Matches with "/api/users/:id"
router
  .route("/:id")
  // @route    Get api/users/:id
  // @desc     Get user
  // @access   Private
  .get(async (req, res) => {
    try {
      const profile = await db.User.findOne({
        _id: req.params.id
      }).select(["-password", "-dateAdded", "-email"]);

      if (!profile) return res.status(400).json({ msg: "Profile not found" });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == "ObjectId") {
        return res.status(400).json({ msg: "User not found" });
      }
      res.status(500).send("Server Error");
    }
  });

// @route    POST api/users/login
// @desc     Authenticate user & get token
// @access   Public
router
  .route("/login")
  .post(
    [
      check("email", "Please include a valid email").isEmail(),
      check("password", "Password is required").exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      try {
        let user = await db.User.findOne({ email: email });
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        const payload = {
          user: {
            id: user._id
          }
        };

        jwt.sign(
          payload,
          process.env.jwtsecret,
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
      }
    }
  );

module.exports = router;
