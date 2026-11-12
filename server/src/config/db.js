const mongoose = require("mongoose");
const { PrismaClient } = require("../generated/prisma");
const { PrismaPg } = require("@prisma/adapter-pg");
mongoose.set("strictQuery", true);

class Database {
    constructor(uri, options){
        this.uri = uri;
        this.options = options;
    }

    async connect(){
        try{
            await mongoose.connect(this.uri, this.options);
            console.log(`DB connected to ${mongoose.connection.db.databaseName}`);
        }catch(err){
            throw new Error(`DB connection error: ${err.message}`)
        }
    }

    async disconnect(){
        try{
            await mongoose.disconnect();
            console.log(`Disconnected from DB: ${mongoose.connection.db.databaseName}`);
        }catch(err){
            throw new Error(`DB disconnection error: ${err.message}`)
        }
    }
}

const adapter = new PrismaPg({
    connectionString: process.env.Database_URL,
});

const prisma = new PrismaClient({adapter});

module.exports = {Database, prisma};