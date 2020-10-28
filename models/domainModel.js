const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  idNumber:{
    type: Number
},
  domainName: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
    required: true,
  },
  emailLimit: {
    type: Number,
    required: true,
  }
  // status: {
  //   type: Boolean,
  //   default: false,
  // },
});
module.exports = mongoose.model("Domain", domainSchema);
