const MessageModel = require("../Shemas/messageSchema");
// get all users messages
const getMessages = async (req, res) => {
  // const messages = await MessageModel.find({ $or:[{user: req.user},{to:req.username},{from:req.username}] });
  // console.log("user name asking for messages",req.username);
  const messages = await MessageModel.find({ $or:[{user: req.user},{to:req.username},{from:req.username}] });
  res.status(200).json(messages);
};
// save a message
const saveMessage = async (req, res) => {
  const { content, at, from, to } = req.body;
  try {
    if (!content || !at || !from || !to) {
      throw Error("no emty fields allowed");
    }
    console.log("user trying to save message",req.user);
    const mss = await MessageModel.create({
      content,
      at,
      from,
      to,
      user: req.user,
    });
    res.json(mss);
  } catch (error) {
    console.log(error)
    res.json(error.message);
  }
};
module.exports = { getMessages, saveMessage };
