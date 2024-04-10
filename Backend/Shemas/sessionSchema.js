const { Schema, default: mongoose } = require("mongoose");

const sessionSchema = new Schema({
   _id:String,
   session:Object
});
const sessionModel=mongoose.model("session", sessionSchema);

module.exports = { SessionStore: sessionModel };
