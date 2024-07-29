const express = require("express");
const router = express.Router();
const guestController = require("../controller/guestController");

router.get("/:id", guestController.getTest);

module.exports = router;
