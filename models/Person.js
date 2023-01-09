const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PersonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
