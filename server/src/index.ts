import express, { Request, Response } from "express";
import { Server } from "socket.io";
import http from 'http';

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, TypeScript with Express!");
});


const server = http.createServer(app);

// setup socket
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });

    socket.on("message", (msg) => {
        console.log("Message received:", msg);
        io.emit("message", msg); // Broadcast the message to all connected clients
    });
});

// handle errors
io.on("error", (error) => {
    console.error("Socket.IO error:", error);
});

server.on("error", (error) => {
    console.error("Server error:", error);
});


// start the server
server.listen(PORT, () => {
    console.log(`Socket.IO server is running at http://localhost:${PORT}`);
});