const Joi = require("joi");

const createSchema = Joi.object({
  word: Joi.string().min(3).max(35).required(),
  meaning: Joi.string().min(5).max(100).required(),
  example: Joi.string().min(5).max(100).required(),
  difficulty: Joi.string().valid("easy", "medium", "hard").required(),
});

const updateSchema = Joi.object({
  word: Joi.string().min(3).max(35),
  meaning: Joi.string().min(5).max(100),
  example: Joi.string().min(5).max(100),
  difficulty: Joi.string().valid("easy", "medium", "hard"),
});

module.exports = { createSchema, updateSchema };
