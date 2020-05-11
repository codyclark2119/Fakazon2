const router = require("express").Router();

router.use("/items", require("./items.js"));
router.use("/users", require("./users.js"));
router.use("/carts", require("./carts.js"));
router.use('/profiles', require("./profiles.js"));

module.exports = router;