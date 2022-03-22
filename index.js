const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on("connection", (socket) => {
	console.log("We are connected")

	socket.emit("me", socket.id);

	socket.on("join", (data, callback) => {
		console.log("Join has been emmited")
		console.log({data})
		callback();
	})

	socket.on("disconnect", () => {
		console.log("we are disconnected")
	});


});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
