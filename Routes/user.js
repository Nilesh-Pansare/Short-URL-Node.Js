const express = require("express");
const { handleUserSingnup, handleUserLogin } = require("../Controllers/user");
const router = express.Router();

router.post("/", handleUserSingnup);
router.post("/login", handleUserLogin);

module.exports = router;
