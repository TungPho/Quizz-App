const socketIO = require("socket.io");
const http = require("http");

const app = require("./src/app");
const FILTER_LENGTH = -7;
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const rooms = {};
const teachersID = {};

io.on("connection", (socket) => {
  console.log("A new user connected or re-connect");
  const { userId, role } = socket.handshake.query;

  if (role === "teacher" && userId) {
    teachersID[userId] = socket.id;
    console.log(teachersID);
  }
  //1. event tạo phòng (lọc những phòng nào có teacher ID đúng để lấy về)
  socket.on("createRoom", (room, teacherID) => {
    if (rooms[room]) {
      console.log("Room has exist");
      return;
    }
    const className = room.slice(0, FILTER_LENGTH);
    console.log(className);
    rooms[room] = [];
    rooms[room].push({
      teacher_socket_id: socket.id,
      teacher_id: teacherID,
      className: className,
    });
    const filterdRooms = Object.entries(rooms).filter(
      (r) => r[0].slice(0, FILTER_LENGTH) === className
    );
    io.to(socket.id).emit("roomList", filterdRooms);
  });

  // Khi ấn refresh button
  socket.on("getRoomList", (className) => {
    const filterdRooms = Object.entries(rooms).filter(
      (r) => r[0].slice(0, FILTER_LENGTH) === className
    );
    io.to(socket.id).emit("roomList", filterdRooms);
  });

  /// when students join the room, lưu ý phải để teacher tạo phòng mới được vào
  //khi student enter room, tìm tới teacher id để gửi tới socket
  socket.on("joinRoom", (room, student) => {
    if (!rooms[room]) {
      console.log("Room not found");
      return;
    }
    const teacher = rooms[room].find((user) => user.teacher_socket_id);
    // push the student to the room array
    rooms[room].push({
      socket_student_id: socket.id,
      ...student,
    });
    io.to(teachersID[teacher.teacher_id]).emit("studentData", rooms[room]);

    // this works but it needs class name
    const filterdRooms = Object.entries(rooms).filter(
      (r) => r[0].slice(0, FILTER_LENGTH) === teacher.className
    );
    io.to(teachersID[teacher.teacher_id]).emit("roomList", filterdRooms);
    console.log(`Student ${student.name} joined`);
  });
  // get room by room's id and teacher's id
  socket.on("getRoomById", (room) => {
    io.to(socket.id).emit("studentData", rooms[room]);
  });
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});
server.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
