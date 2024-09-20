const User = require('../models/user');
const bcrypt = require('bcrypt');

// User signup
const signup = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        next(err);
    }
};

// User login
const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.json({ message: 'Login successful', userId: user._id });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signup,
    login,
};