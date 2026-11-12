const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv = require("dotenv").config();
const {Database, prisma} = require("./config/db");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const paymentRoutes = require("./routes/payment.routes");
const Log = require("./models/log.model");
const {Donation} = require("./models/donation.model");
const {Comment} = require("./models/comment.model");

const app=express();

const PORT = process.env.PORT || 8000;
const db = new Database(process.env.MONGODB_URI, {});


db.connect().catch(err=>{
    console.error("Error connecting to DB", err);
})

const allowedOrigins = process.env.ALLOWED_ORIGINS?process.env.ALLOWED_ORIGINS.split(','):[];

const corsOptions = {
    origin: (origin, callback)=>{
        if(!origin) return callback(null, true);

        if(allowedOrigins.indexOf(origin)!==-1 || process.env.NODE_ENV === 'development'){
            callback(null, true);
        }else{
            callback(new Error(`Blocked by CORS policy: Origin not allowed: ${origin}`));
        }
    },
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONs'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/payments", paymentRoutes);

app.get("/", async (req, res)=>{
    console.log("Hello from server");
    const logs=await Log.find().sort({timestamp: -1});
    res.json({message: "Logs for admin", logs});
})

// Place this AFTER all your app.use() routes
app.use((err, req, res, next) => {
    console.error("❌ CAUGHT GLOBAL ERROR:", err.stack);
    
    // Prevents the server from crashing, sends a clean fallback response instead
    res.status(500).json({ 
        message: "Internal Server Error", 
        error: process.env.NODE_ENV === 'development' ? err.message : {} 
    });
});


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