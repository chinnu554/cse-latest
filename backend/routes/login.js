import express from 'express';
import { comparePassword } from '../middleware/bcrypt.js';
import { getAdminDB } from '../config/mongoConnect.js';
import dotenv from 'dotenv';

dotenv.config();


const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const database = getAdminDB();
        const collection = database.collection('admin');

        const user = await collection.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);

        if (isMatch) {
            res.status(200).json({ message: 'Login successful', access: true });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (err) {
        next(err);
    }
});
export default router;
