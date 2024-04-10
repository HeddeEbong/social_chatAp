var express = require("express");
var http = require("http");
var { Server } = require("socket.io");
var cors = require("cors");
const userRouter = require("./Routes/userRoutes");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();
const serverSocket = require("./socket");
const requireAuth = require("./middleWares/requireAuth");
const session = require("express-session");
const app = express();
const server = http.createServer(app);
const mongoStore = require("connect-mongo");
const messageRouter = require("./Routes/message");
const profilePicRouter=require("./Routes/profilePic");

const sessionMiddleware = session({
  secret: "hedde-ebong has a large weyner",
  resave: false,
  saveUninitialized: false,
  store: mongoStore.create({
    mongoUrl: process.env.CONNECTION2,
  }),
});
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});


// middle wares
app.use(cors());
io.engine.use(sessionMiddleware);
app.use(express.json());


// socket middlewares

// io.use(checkSession);
serverSocket(io);

// ..........end of socket implimentation .........//
app.use("/api/profilePic/",profilePicRouter);
app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);

// main locked routes
app.use("/userProfiles/",express.static("userProfiles"));
app.get("/api/home", (req, res) => {
  res.send("home");
});
mongoose
  .connect(process.env.CONNECTION2)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("listening on " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
