const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    required: true,
  },
  at: {
    type: String,
    required: true,
  },
  from: {
    type: String,
  },
  user: {
    type: ObjectId,
  },
});

module.exports = mongoose.model("Message", messageSchema);
