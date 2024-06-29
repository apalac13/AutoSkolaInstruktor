const express = require("express");
const router = express.Router();
const eNastavaController = require("../controller/eNastavaController");

router.post("/register", eNastavaController.register);
router.post("/", eNastavaController.logIn);
// router.post('/reset', apiController.Reset)
// router.post('/reset-password-done', apiController.resestPasswordDone)

// router.get('/check', apiController.verifyToken, apiController.getCheck)

module.exports = router;
