const userSchema = require("../Shemas/userSchema");
const bycrpt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id, type = "access_token", duration = "15min") => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: type === "refresh_token" ? "7d" : duration,
  });
};

const encrypt = async (password) => {
  let salt = await bycrpt.genSalt();
  let results = await bycrpt.hash(password, salt);
  return results;
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Email or password must be present");
    }

    const user = await userSchema.findOne({ email });

    if (!user) {
      throw new Error("No such user found");
    }

    if (!(await bycrpt.compare(password, user.password))) {
      throw new Error(
        "Passwords do not match. Please enter the correct password"
      );
    }

    const access_token = createToken(user._id);
    const refresh_token = createToken(user._id, "refresh_token");

    res.json({
      access_token,
      refresh_token,
      email,
      username: user.username,
      _id: user._id,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUp = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    if (!username) {
      throw new Error("Username not present");
    }

    if (!email || !password) {
      throw new Error("Email or password must be present");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please enter a valid email");
    }

    const exist = await userSchema
      .find({ $or: [{ username }, { email }] })
      .select(["email", "username"]);

    exist.forEach((i) => {
      if (i.email === email) {
        throw new Error("Email already in use");
      }
      if (i.username === username) {
        throw new Error("Username already taken");
      }
    });

    const psw = await encrypt(password);
    const user = await userSchema.create({ email, password: psw, username });

    const refresh_token = createToken(user._id, "refresh_token");
    const access_token = createToken(user._id);

    res.status(200).json({
      access_token,
      refresh_token,
      email,
      username,
      _id: user._id,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const _id = req.user;

  if (req.file) {
    const user = await userSchema.findByIdAndUpdate(
      req.user,
      { profilePic: `http://localhost:3000/${req.file.path}` },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "No such user found" });
    }

    return res.json({ profilePic: user.profilePic });
  }

  const items = { ...req.body };

  if (items.password) {
    items.password = await encrypt(items.password);
  }

  const user = await userSchema.findByIdAndUpdate(
    { _id: req.user },
    { ...items },
    { new: true }
  );

  if (!user) {
    return res.status(404).json({ error: "No such user found" });
  }

  const changedItems = Object.keys(items).reduce((acc, item) => {
    if (typeof user[item] !== "undefined" && item !== "password") {
      acc[item] = user[item];
    }
    return acc;
  }, {});

  res.status(200).json(changedItems);
};

const getRefreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(402).json({ error: "A token is required" });
  }

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const refresh_token = createToken(_id);
    res.status(200).json(refresh_token);
  } catch (error) {
    res.status(403).json(error);
  }
};

module.exports = { login, signUp, update, getRefreshToken, createToken };
