const express = require("express");
const multer = require("multer");
const router = express.Router();
const eNastavaController = require("../controller/eNastavaController");
const adminController = require("../controller/adminController");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../frontend/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/register", eNastavaController.register);
router.put("/reset-password", eNastavaController.resetPassword);
router.post("/", eNastavaController.logIn);
router.post(
  "/testovi",
  eNastavaController.verifyToken,
  eNastavaController.saveTestResult
);
router.post(
  "/kvizovi",
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
  upload.single("image"),
  adminController.addQuestion
);
router.get(
  "/kvizovi/:id",
  eNastavaController.verifyToken,
  eNastavaController.getAllQuestions
);
router.post(
  "/kvizovi/:id",
  eNastavaController.verifyToken,
  eNastavaController.saveQuizResult
);
router.get(
  "/kvizovi/:id/pogledaj",
  adminController.verifyToken,
  eNastavaController.getAllQuestions
);

router.delete(
  "/kvizovi/:kvizId/:questionId/pogledaj",
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

router.get(
  "/rezultati/kvizovi",
  adminController.verifyToken,
  adminController.getQuizResults
);
router.get(
  "/rezultati/kviz/:id",
  adminController.verifyToken,
  adminController.getQuizResult
);

router.delete(
  "/rezultati/kviz/:id",
  adminController.verifyToken,
  adminController.deleteQuizResult
);
router.get(
  "/rezultati/testovi",
  adminController.verifyToken,
  adminController.getTestResults
);
router.get(
  "/rezultati/test/:id",
  adminController.verifyToken,
  adminController.getTestResult
);
router.delete(
  "/rezultati/test/:id",
  adminController.verifyToken,
  adminController.deleteTestResult
);

router.get(
  "/chat",
  eNastavaController.verifyToken,
  eNastavaController.getAllMessages
);
router.post(
  "/chat",
  eNastavaController.verifyToken,
  eNastavaController.saveMessage
);
router.delete(
  "/chat",
  adminController.verifyToken,
  adminController.deleteMessages
);

module.exports = router;
