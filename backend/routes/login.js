import express from 'express';
import { comparePassword } from '../middleware/bcrypt.js';
const router = express.Router(); 
import { getAdminDB } from '../config/mongoConnect.js';
router.post('/login', async (req, res) => { 
    try {   
        const database = getAdminDB();
        const colletion = database.collection('admin');
        const { username, password } = req.body;
        const user = await colletion.findOne({ username: username });
        if(!user){
            return  res.status(401).json({ message: 'Admin not found' });
        }
            const hashedPassword = user.password;
            const isMatch = await comparePassword(password, hashedPassword);
            if (isMatch) {
                res.status(200).json({ message: 'Login successful' , access:true });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }   
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;