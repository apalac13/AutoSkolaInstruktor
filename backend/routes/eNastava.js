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

router.post("", eNastavaController.logIn);
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
  eNastavaController.verifyToken,
  eNastavaController.getAllQuizes
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
  eNastavaController.getQuiz
);
router.post(
  "/kvizovi/:id",
  eNastavaController.verifyToken,
  eNastavaController.saveQuizResult
);
router.get(
  "/kvizovi/:id/pogledaj",
  eNastavaController.verifyToken,
  eNastavaController.getQuiz
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

router.get(
  "/kandidati",
  eNastavaController.verifyToken,
  adminController.getAllUsers
);

router.post(
  "/kandidati",
  adminController.verifyToken,
  adminController.registerUser
);

router.delete(
  "/kandidati/:id",
  adminController.verifyToken,
  adminController.deleteUser
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

module.exports = router;
