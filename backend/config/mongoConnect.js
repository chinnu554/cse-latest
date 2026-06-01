import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import dns from "node:dns";

dotenv.config();

const url = process.env.MONGODB_URI;
const mongoTimeoutMs = Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS || 10000);

if (url?.startsWith("mongodb+srv://")) {
  const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (dnsServers.length > 0) {
    try {
      dns.setServers(dnsServers);
      console.log(`Using custom DNS servers for MongoDB SRV: ${dnsServers.join(", ")}`);
    } catch (err) {
      console.warn("Failed to set custom DNS servers:", err?.message || err);
    }
  }
}

if (!url) {
  throw new Error("MONGODB_URI is required in environment variables");
}

const client = new MongoClient(url, {
  serverSelectionTimeoutMS: Number.isNaN(mongoTimeoutMs) ? 10000 : mongoTimeoutMs,
});
let database, resources, admin, images;
let connectPromise = null;

async function connectDB() {
  if (database && resources && admin && images) {
    return client;
  }

  if (connectPromise) {
    return connectPromise;
  }

  connectPromise = client
    .connect()
    .then(() => {
      database = client.db(process.env.MONGODB_DB_PEOPLE);
      resources = client.db(process.env.MONGO_DB_RESOURCES);
      admin = client.db(process.env.MONGO_DB_ADMINS);
      images = client.db(process.env.MONGO_DB_IMAGES);
      console.log("MongoDB connected successfully");
      return client;
    })
    .catch((err) => {
      connectPromise = null;
      console.error("MongoDB connection failed:", err);
      throw err;
    });

  return connectPromise;
}

export function getDatabase() {
  if (!database) throw new Error("Database not connected yet!");
  return database;
}

export function getResourcesDB() {
  if (!resources) throw new Error("materials database not connected yet");
  return resources;
}

export function getAdminDB() {
  if (!admin) throw new Error("admin database not connected yet");
  return admin;
}

export function getImagesDB() {
  if (!images) throw new Error("images database not connected yet");
  return images;
}

export default connectDB;
