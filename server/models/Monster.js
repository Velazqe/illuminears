const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const monsterSchema = new Schema({
  monsterName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  habitat: {
    type: String,
    required: true,
  },
  weaknesses: {
    type: [String],
    required: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Monster = model("Monster", monsterSchema);

module.exports = Monster;
