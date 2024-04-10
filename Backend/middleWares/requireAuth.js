const jwt = require("jsonwebtoken");
const User = require("../Shemas/userSchema");
const requireAuth = async (req, res, next) => {
  // verify authentification
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const   {_id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(_id);
    
    if(!user){
      throw Error("no such user found in our database")
    }
    const { _id:id,username }=user
    req.user = id;
    req.username=username
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: "request not authorised", message: error.message });
  }
};

module.exports = requireAuth;
