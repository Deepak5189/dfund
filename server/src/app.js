const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv = require("dotenv").config();
const Database = require("./config/db");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const Log = require("./models/log.model");
const {Donation} = require("./models/donation.model");
const {Comment} = require("./models/comment.model");


const app=express();

const PORT = process.env.PORT || 8000;
const db = new Database(process.env.MONGODB_URI, {});

db.connect().catch(err=>{
    console.error("Error connecting to DB", err);
})

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", async (req, res)=>{
    console.log("Hello from server");
    const logs=await Log.find().sort({timestamp: -1});
    res.json({message: "Logs for admin", logs});
})

process.on("SIGINT", async ()=>{
    try{
        await db.disconnect();
        console.log("Disconnected from Database.");
        process.exit(0);
    }catch(error){
        console.error(error);
        process.exit(1);
    }
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})