const mongoose = require("mongoose");

const VocabSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      minlength: 3,
      maxlength: 35,
      required: true,
    },
    meaning: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    example: {
      type: String,
      minlength: 5,
      maxlength: 100,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const vocab = mongoose.model("vocab", VocabSchema);
module.exports = vocab;
