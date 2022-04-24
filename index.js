const app = require("./app");
const { connectDb } = require('./config')
const { seedDb } = require('./seed');
const socketio = require("socket.io");
const http = require("http");
const server = http.createServer(app);

const io = socketio(server,{
    cors: {
        origin: "*", // put frontend url in production 
        credentials: true
    }
}); 

require("./sockets/index.js")(io);


server.listen(process.env.PORT || 8000, async ()=>{
    try {   
        await connectDb();
        await seedDb();
    } catch(err) {
        console.log("Error connecting with db")
        console.log(err)
    }

})
