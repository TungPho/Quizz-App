const socketIO = require("socket.io");
const http = require("http");

const app = require("./src/app");
const FILTER_LENGTH = 7;
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// notifications này nên được lấy từ DB, rồi push tiếp rồi set lại, không nên push chồng chéo lên nhau
// danh sách lỗi (record lại buổi thi nên lấy từ Database và cả notifications cũng vậy)
const rooms = {};
io.on("connection", (socket) => {
  console.log("a new user connected");
  //1. event tạo phòng (lọc những phòng nào có teacher ID đúng để lấy về)
  socket.on("createRoom", (room, teacherID) => {
    if (rooms[room]) {
      console.log("Room has exist");
      return;
    }
    rooms[room] = [];
    rooms[room].push({
      teacher_socket_id: socket.id,
      teacher_id: teacherID,
    });

    const className = room.slice(0, room.length - FILTER_LENGTH);
    //console.log(Object.entries(rooms)[0][1][0].teacher_id);
    // const final = Object.entries(rooms).filter(
    //   (r) => r[0].slice(0, room.length - 7) === className
    // );
    const filterdRooms = Object.keys(rooms).filter(
      (r) => r.slice(0, r.length - FILTER_LENGTH) === className
    );
    io.to(socket.id).emit("roomList", filterdRooms);
  });

  socket.on("getRoomList", (className) => {
    const filterdRooms = Object.keys(rooms).filter(
      (r) => r.slice(0, r.length - FILTER_LENGTH) === className
    );
    io.to(socket.id).emit("roomList", filterdRooms);
  });

  /// when someone join the room
  socket.on("joinRoom", (room, name) => {
    if (!rooms[room]) {
      console.log("No Room found");
      return;
    }
    const teacher_socket_id = rooms[room].find(
      (user) => user.teacher_socket_id
    ).teacher_socket_id;
    rooms[room].push({
      student_id: socket.id,
      name: name,
    });
    io.to(teacher_socket_id).emit("studentData", rooms[room]);
    console.log(`Student ${name} joined`);
  });
});
server.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
