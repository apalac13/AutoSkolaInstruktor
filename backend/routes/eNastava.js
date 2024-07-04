const express = require("express");
const router = express.Router();
const eNastavaController = require("../controller/eNastavaController");
const adminController = require("../controller/adminController");

router.post("/register", eNastavaController.register);
router.post("/", eNastavaController.logIn);
router.post(
  "/napravi-kviz",
  adminController.verifyToken,
  adminController.createQuiz
);
router.get(
  "/kvizovi",
  adminController.verifyToken,
  adminController.getAllQuizes
);
router.post(
  "/kvizovi/:id/dodaj-pitanje",
  adminController.verifyToken,
  adminController.addQuestion
);

router.get(
  "/kvizovi/:id",
  adminController.verifyToken,
  adminController.getAllQuestions
);

router.delete(
  "/kvizovi/:kvizId/:questionId",
  adminController.verifyToken,
  adminController.deleteQuestion
);

router.delete(
  "/kvizovi/:id",
  adminController.verifyToken,
  adminController.deleteQuiz
);

router.put(
  "/kvizovi/:id",
  adminController.verifyToken,
  adminController.uploadQuiz
);
// router.post('/reset', apiController.Reset)
// router.post('/reset-password-done', apiController.resestPasswordDone)

// router.get('/check', apiController.verifyToken, apiController.getCheck)

module.exports = router;
