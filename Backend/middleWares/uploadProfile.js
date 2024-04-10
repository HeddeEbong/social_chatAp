const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./userProfiles",
  filename: function (req, file, cb) {
    const uniqueSuffix = req.user;
    cb(null, file.fieldname + "-" + uniqueSuffix+".jpg");
  },
});
const upload = multer({ storage,limits: { fieldSize: 25 * 1024 * 1024 } });

module.exports = upload;
