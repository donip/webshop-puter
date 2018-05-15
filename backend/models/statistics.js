const mongoose = require('mongoose');

const satsSchema = mongoose.Schema({
    numberofproduct: {
      type: number,
    },
    pruduct : {
      type: number,
    },
  }, {
    timestamps: true,
  });