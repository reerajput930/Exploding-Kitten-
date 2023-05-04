const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: "String",
    required:true
  },   
  email: {
    type: "String",
    required:true
  },
  score: {  
    type: Number,     
    default: 0,
  },
});


const userModel = mongoose.model("Card", userSchema);

module.exports =userModel;
