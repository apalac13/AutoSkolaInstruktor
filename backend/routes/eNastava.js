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
router.post("/", eNastavaController.logIn);
router.get(
  "/pocetna/kvizovi",
  eNastavaController.verifyToken,
  eNastavaController.getHomeQuiz
);
router.get(
  "/pocetna/rezultati",
  adminController.verifyToken,
  adminController.getResults
);

router.delete(
  "/pocetna/rezultati/:id",
  adminController.verifyToken,
  adminController.deleteResult
);
router.get(
  "/pocetna/:id",
  eNastavaController.verifyToken,
  eNastavaController.getAllQuestions
);
router.post(
  "/pocetna/:id",
  eNastavaController.verifyToken,
  eNastavaController.saveResult
);
router.put(
  "/pocetna/:id",
  adminController.verifyToken,
  adminController.uploadQuiz
);
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
  upload.single("image"),
  adminController.addQuestion
);

router.get(
  "/kvizovi/:id",
  adminController.verifyToken,
  eNastavaController.getAllQuestions
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

module.exports = router;
