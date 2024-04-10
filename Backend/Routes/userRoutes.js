const express=require("express");
const upload =require("../middleWares/uploadProfile");
const { login,signUp, update,getRefreshToken } = require("../controllers/userController");
const userModel = require("../Shemas/userSchema");
const requireAuth = require("../middleWares/requireAuth");

const router=express.Router();

router.post("/login",login);
router.post("/refresh_token",getRefreshToken);

router.post("/signup",signUp);

// update a user
router.patch("/update",requireAuth,upload.single("profile-picture"),update);
module.exports= router