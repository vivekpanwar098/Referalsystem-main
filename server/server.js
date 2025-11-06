require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./model/User');
const jwt = require('jsonwebtoken'); 
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors()

);
app.use(express.json());

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Route: Signup and Referral Logic ---
app.post('/api/signup', async (req, res) => {
    const { email, password, referrerEmail } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let initialPoints = 0;

        if (referrerEmail) {
            initialPoints = 10;
        }

        const newUser = new User({
            email,
            password: hashedPassword,
            points: initialPoints,
            referrerEmail: referrerEmail || null
        });

        await newUser.save();

        if (referrerEmail) {
            const referrer = await User.findOne({ email: referrerEmail });

            if (referrer) {
                if (referrer.email !== newUser.email) {
                    referrer.points += 10;
                    await referrer.save();
                    console.log(`Referrer (${referrer.email}) awarded 10 points.`);
                }
            } else {
                console.log(`Referrer email (${referrerEmail}) not found.`);
            }
        }
        
        // --- JWT Generation for Signup (Needed for Dashboard redirect) ---
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            message: 'Signup successful!', 
            token, // Include token in signup response
            user: { 
                email: newUser.email, 
                points: newUser.points, 
                referrerEmail: newUser.referrerEmail 
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during signup.' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials (User not found).' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials (Password mismatch).' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            token,
            user: { 
                email: user.email, 
                points: user.points, 
                referrerEmail: user.referrerEmail
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});