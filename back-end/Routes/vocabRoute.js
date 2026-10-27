const express = require("express");
const vocabController = require("../controllers/vocabController");
const authMiddleware = require("../middleware/authMiddleware");
const vocabValidator = require("../validator/vocabValidator");
const validate = require("../middleware/validate");
const router = express.Router();

router.use(authMiddleware.authMiddleware);

router
  .route("/")
  .post(validate(vocabValidator.createSchema), vocabController.createVocab)
  .get(vocabController.getAllVocab);
router
  .route("/:id")
  .delete(vocabController.deleteVocab)
  .patch(validate(vocabValidator.updateSchema), vocabController.updateVocab)
  .get(vocabController.getSelectedVocab);

module.exports = router;
