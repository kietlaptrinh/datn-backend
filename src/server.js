import { createServer } from "http";
import { Server } from "socket.io";
import app, { init } from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT || 4000;


const httpServer = createServer(app);


const io = new Server(httpServer, {
  cors: {
    // Cho phép cả localhost và link vercel
    origin: [
        "http://localhost:5173", 
        "https://datn-frontend-1.vercel.app", 
        "https://datn-frontend.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true // Thêm dòng này cho chắc
  }
});


io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);


  socket.on("join_room", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`User ${username} joined room: ${roomId}`);
    
    socket.to(roomId).emit("receive_message", {
      user: "Hệ thống",
      text: `${username} đã tham gia phòng!`,
      time: new Date().toLocaleTimeString(),
      isSystem: true
    });
  });







  socket.on("send_message", (data) => {
    io.in(data.roomId).emit("receive_message", data);
  });

  socket.on("change_scene", ({ roomId, panoId }) => {
    socket.to(roomId).emit("sync_scene", panoId);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

init().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`Server & Socket running on http://localhost:${PORT}`);
  });
});
