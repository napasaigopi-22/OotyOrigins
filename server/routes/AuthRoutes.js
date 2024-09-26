const { Signup } = require("../Controllers/Auth");
const router = require("express").Router();

router.post("/signup", Signup);

module.exports = router;