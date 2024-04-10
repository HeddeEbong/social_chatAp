const router = require("express").Router();
const requireAuth = require("../middleWares/requireAuth");
const upload = require("../middleWares/uploadProfile");
const userModel = require("../Shemas/userSchema");

router.use(requireAuth);

router.post("/upload", upload.single("profile-picture"), async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.user, {
      profilePic: `http://localhost:3000/${req.file.path}`,
    });
    res.json({profilePic:user.profilePic});
  } catch (error) {
    res.json(error);
  }
});

router.get("/get/:name", async (req, res) => {
  const name = req.params.name;
  if (!name) {
    return res.status(400).json({ error: "username must be present" });
  }
  try {
    const user = await userModel.findOne({ username: name });
    console.log(user);
    if (!user) {
        throw Error("no such user found");
    }
    const url = user.profilePic;

    if(!url){
      return res.status(300).json("no profile pic set yet");
    }
    res.json(url);
  } catch (error) {
    res.status(404).json({error:error.message});
  }
});

module.exports = router;
