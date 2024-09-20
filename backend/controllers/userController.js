const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        const savedUser = await user.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
        next(err);
    }
};

// Login user
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerUser,
    loginUser
};