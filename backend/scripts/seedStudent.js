import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env from parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function seedStudent() {
    const url = process.env.MONGODB_URI;
    if (!url) {
        console.error("MONGODB_URI is missing in .env");
        process.exit(1);
    }

    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(process.env.MONGODB_DB_PEOPLE || "people");
        const collection = db.collection("secondYears");

        // Clean existing sample to avoid duplicate key errors if testing multiple times
        await collection.deleteMany({ rollNo: "20GK1A0501" });

        const hashedPassword = await bcrypt.hash("password123", 10);

        const sampleStudent = {
            rollNo: "20GK1A0501",
            password: hashedPassword,
            fullName: "Jane Doe",
            email: "jane.student@example.com",
            branch: "CSE",
            imageUrl: "https://ui-avatars.com/api/?name=Jane+Doe&background=random",
            marks: {
                internal1: 85,
                internal2: 92
            },
            attendance: {
                total: 100,
                present: 88
            }
        };

        const result = await collection.insertOne(sampleStudent);
        console.log(`Sample student created with _id: ${result.insertedId}`);
        console.log("Login Credentials:");
        console.log("Roll No: 20GK1A0501");
        console.log("Password: password123");

    } catch (error) {
        console.error("Error seeding student:", error);
    } finally {
        await client.close();
        console.log("MongoDB connection closed");
    }
}

seedStudent();
