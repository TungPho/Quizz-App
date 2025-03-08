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
const joinedStudentID = {};

io.on("connection", (socket) => {
  console.log("A new user connected or re-connect");
  const { userId, role } = socket.handshake.query;

  // get teacher's user id
  if (role === "teacher" && userId) {
    teachersID[userId] = socket.id;
  }
  // get student's user id

  if (role === "student" && userId) {
    joinedStudentID[userId] = socket.id;
  }

  socket.on("createRoom", (room, teacherID, testID) => {
    if (rooms[room]) {
      console.log("Room has exist");
      return;
    }
    const className = room.slice(0, FILTER_LENGTH);
    rooms[room] = [];
    rooms[room].push({
      teacher_socket_id: socket.id,
      teacher_id: teacherID,
      className: className,
      test_id: testID,
    });
    //
    const filteredRooms = Object.entries(rooms).filter(
      (r) => r[0].slice(0, FILTER_LENGTH) === className
    );
    io.to(socket.id).emit("roomList", filteredRooms);
  });

  socket.on("getRoomList", (className) => {
    const filteredRooms = Object.entries(rooms).filter(
      (r) => r[0].slice(0, FILTER_LENGTH) === className
    );
    io.to(socket.id).emit("roomList", filteredRooms);
  });

  socket.on("joinRoom", (room, student) => {
    if (!rooms[room]) {
      console.log("Room not found");
      return;
    }
    const foundStudent = rooms[room].find(
      (user) => user.student_id_db === student.student_id_db
    );
    console.log("FOUND", foundStudent);
    if (foundStudent) {
      console.log("You are already joined");
      return;
      //TODO: remember to emit an event to show that you're alread
    }
    const studentSocketID = joinedStudentID[student.student_id_db];
    // 1.  find the teacher
    const teacher = rooms[room].find((user) => user.teacher_socket_id);
    // 2.  push the student to the room array
    rooms[room].push({
      examID: teacher.test_id,
      ...student,
    });
    // 3.  send student data to the teacher's room
    io.to(teachersID[teacher.teacher_id]).emit("studentData", rooms[room]);

    const filteredRooms = Object.entries(rooms).filter(
      (r) => r[0].slice(0, FILTER_LENGTH) === teacher.className
    );
    //4.  gửi cho teacher room của class teacher đó dạy
    io.to(teachersID[teacher.teacher_id]).emit("roomList", filteredRooms);

    // gửi id bài test cho student's socket.id
    const testID = teacher.test_id;
    io.to(studentSocketID).emit("sentTestID", testID);
    console.log(`Student ${student.name} joined room ${room}`);
  });
  socket.on("getRoomById", (room) => {
    io.to(socket.id).emit("studentData", rooms[room]);
  });
  socket.on("studentInfo", (userID, room) => {
    const currentRoom = rooms[room];
    if (!currentRoom) {
      console.log("error");
      return;
    }
    let foundStudent;
    for (let student of currentRoom) {
      if (student.student_id_db === userID) {
        foundStudent = student;
      }
    }
    // sent data to students
    io.to(joinedStudentID[foundStudent.student_id_db]).emit(
      "sentStudentInfo",
      foundStudent
    );
  });
  // check room exist
  socket.on("checkRoomExist", (room) => {
    if (!rooms[room]) io.to(socket.id).emit("isRoomExist", false);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });
});
server.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
