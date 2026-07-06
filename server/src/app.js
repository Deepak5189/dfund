const express = require("express");
const cors = require("cors");
dotenv = require("dotenv").config();
const Database = require("./config/db");
const userRoutes = require("./routes/user.routes");


const app=express();

const PORT = process.env.PORT || 8000;
const db = new Database(process.env.MONGODB_URI, {});

db.connect().catch(err=>{
    console.error("Error connecting to DB", err);
})

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    console.log("Hello from server");
    res.json({message: "Hello From Server", status: "success"});
})

app.use("/users", userRoutes);

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