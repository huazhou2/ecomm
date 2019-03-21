const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    group: String,
    products: Array,
    message: String,
    avatar: String,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {timestamps: true},
);
module.exports = mongoose.model('massagecustomers', DataSchema);
