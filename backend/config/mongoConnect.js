import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
let database,resources,admin,images;

async function connectDB() {
  try {
    await client.connect();
    database = client.db(process.env.MONGODB_DB_PEOPLE);
    resources = client.db(process.env.MONGO_DB_RESOURCES);
    admin=client.db(process.env.MONGO_DB_ADMINS);
    images=client.db(process.env.MONGO_DB_IMAGES);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

export function getDatabase() {
  if (!database) throw new Error("Database not connected yet!");
  return database;
}
export function getResourcesDB(){
  if(!resources) throw new Error("materials database not connected yet");
  return resources;
}
export function getAdminDB(){ 
    if(!admin) throw new Error("admin database not connected yet");
    return admin;
}
export function getImagesDB(){ 
    if(!images) throw new Error("admin database not connected yet");
    return images;
}
export default connectDB;
