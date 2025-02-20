const express = require("express");
const router = express.Router();
const guestController = require("../controller/guestController");

router.get("/online-testovi/:id", guestController.getTest);
router.post("/online-prijava", guestController.sendOnlineApplication);
router.post("/kontakt", guestController.sendInquiry);

module.exports = router;
