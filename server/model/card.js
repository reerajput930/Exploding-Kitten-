const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: "String",
    require: true,
  },
  email: {
    type: "String",
    require: true,
  },
  score: {
    type: Number,   
    default: 0,
  },
});


const userModel = mongoose.model("Card", userSchema);

module.exports =userModel;
