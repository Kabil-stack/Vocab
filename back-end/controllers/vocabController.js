const Vocab = require("../models/Vocab");
const AppError = require("../utilities/AppError");

exports.createVocab = async (req, res, next) => {
  try {
    const newVocab = await Vocab.create({
      word: req.body.word,
      meaning: req.body.meaning,
      example: req.body.example,
      difficulty: req.body.difficulty,
      userId: req.user.id,
    });
    if (!newVocab) {
      return next(new AppError(401, "you must log first"));
    }
    res.status(201).json({
      status: "success",
      data: {
        newVocab,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteVocab = async (req, res, next) => {
  try {
    const DeleteVocab = await Vocab.findOneAndDelete({
      userId: req.user.id,
      _id: req.params.id,
    });
    if (!DeleteVocab) {
      return next(new AppError(404, "cannot find the data"));
    }
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllVocab = async (req, res, next) => {
  try {
    const { difficulty, word, sort, search } = req.query;

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {
      userId: req.user.id,
    };
    if (difficulty) {
      if (difficulty === "easy") {
        filter.difficulty = "easy";
      } else if (difficulty === "medium") {
        filter.difficulty = "medium";
      } else if (difficulty === "hard") {
        filter.difficulty = "hard";
      } else {
        return next(
          new AppError(500, "difficulty must be either easy,hard or medium"),
        );
      }
    }

    if (word) {
      filter.word = word;
    }
    let sortOption = {};
    if (sort === "word") {
      sortOption.word = 1;
    }
    if (sort === "-word") {
      sortOption.word = -1;
    }
    if (sort) {
      if (sort === "createdAt") {
        sortOption.createdAt = 1;
      }
      if (sort === "-createdAt") {
        sortOption.createdAt = -1;
      }
    } else {
      sortOption.createdAt = -1;
    }

    if (search) {
      filter.word = {
        $regex: search,
        $options: "i",
      };
    }

    const allVocab = await Vocab.find(filter)

      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    const totalVocab = await Vocab.countDocuments(filter);
    const totalPage = Math.ceil(totalVocab / limit);
    if (page > totalPage || Number(req.query.page) <= 0) {
      return next(new AppError(200, "Page doesn't exist"));
    }
    if (allVocab.length === 0) {
      return next(new AppError(404, "No data found"));
    }

    res.status(200).json({
      status: "success",
      count: allVocab.length,
      data: allVocab,
      page: page,
      totalPage: totalPage,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateVocab = async (req, res, next) => {
  try {
    const updatedVocab = await Vocab.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      {
        new: true,
      },
    );
    if (!updatedVocab) {
      return next(new AppError(404, "cannot find the data"));
    }
    res.status(201).json({
      status: "success",
      data: updatedVocab,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSelectedVocab = async (req, res, next) => {
  try {
    const selectedVocab = await Vocab.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!selectedVocab) {
      return next(new AppError(404, "cannot find the data"));
    }
    res.status(201).json({
      status: "success",
      data: selectedVocab,
    });
  } catch (err) {
    next(err);
  }
};
