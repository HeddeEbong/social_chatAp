const { default: mongoose } = require("mongoose");
const { SessionStore } = require("./Shemas/sessionSchema");
const { v4: uuid } = require("uuid");
const MessageModel = require("./Shemas/messageSchema");
const { createToken } = require("./controllers/userController");
const randomId = () => {
  return uuid();
};
const serverSocket = (io) => {
  // middleware
  io.use(async (socket, next) => {
    const userDetails = socket.handshake.auth;

    let username = undefined;
    let sessionID = undefined;
    let user;
    if (userDetails) {
      username = userDetails.user ? userDetails.user.username : undefined;
      user = userDetails.user ? userDetails.user.user : undefined;
      sessionID = userDetails.user ? userDetails.user.sessionID : undefined;
    }
    if (!username || !user) {
      return next(new Error("invalid user (no username or userID)"));
    }

    let session;
    if (sessionID !== undefined || !sessionID) {
      // find existing session
      try {
        session = await SessionStore.findOne({ _id: sessionID });
      } catch (error) {
        console.log(error);
      }
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.session.userID;
        socket.username = username;
        socket.user = user;
        return next();
      }
    }

    // create new session

    socket.sessionID = randomId();
    socket.userID = randomId();
    socket.username = username;
    socket.user = user;
    // socket.username = username;
    console.log("session id", socket.sessionID, "userID", socket.userID);
    let cookie = {
      userID: socket.userID,
      username: socket.username,
    };

    SessionStore.create({ session: cookie, _id: socket.sessionID });

    next();
  });

  //socket implimentation //

  io.on("connection", (socket) => {
    // saving the socket session to DB;
    socket.join(socket.username);
    socket.join(socket.user);
    var users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: socket.userID,
        username: socket.username,
      });
    }

    socket.broadcast.emit("user connected", {
      userID: socket.id,
      username: socket.username,
      user: socket.user,
    });

    // send users to frontend

    io.emit("users", users);

    socket.emit("session", {
      sessionID: socket.sessionID,
      userID: socket.userID,
    });
    socket.on("disconnect", () => {
      // notify other users
      socket.broadcast.emit("user disconnected", {
        userID: socket.id,
        username: socket.username,
      });
    });

    // private message
    socket.on("private message", async ({ content, to, at }) => {
      io.to(to).emit("private message", {
        content,
        from: socket.username,
        at,
        to,
      });

      const message = await fetch("http:localhost:3000/api/messages/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${createToken(socket.user)}`
        },
        body: JSON.stringify({
          content,
          to,
          at,
          from: socket.username,
          user: socket.user,
        }),
      });
      if(!message.ok){
        console.log(await message.text())
      }
    });
  });
};

module.exports = serverSocket;
