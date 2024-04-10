const router=require("express").Router();
const {getMessages, saveMessage}=require("../controllers/message");
const requireAuth = require("../middleWares/requireAuth");

router.use(requireAuth);

// get all my messages
router.get("/",getMessages);

// save a message
router.post("/save",saveMessage);

module.exports=router