const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDAO = require('./dao/userDAO');
const userDTO = require('./models/userDTO');
const {getUserByUsername} = require("./dao/userDAO");

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role
    };
    return jwt.sign(payload, 'twój_tajny_klucz', { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, 'twój_tajny_klucz', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userDAO.getUserByUsername(username);
        console.log("user:", user)

        if (user && await comparePasswords(password, user.password)) {
            res.status(200).json({ message: 'Login successful', token: generateToken(user) });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, password, email, role, status } = req.body

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.'
            });
        }

        const hashedPassword = await hashPassword(password)

        const userDto = new userDTO(null, username, hashedPassword, email, role, status);

        if(getUserByUsername(username) != null) {
            res.status(401).json({ message: 'User with this credentials already exists', username: username });
        }

        const result = await userDAO.createUser(userDto);

        res.status(201).json({ message: 'User registered successfully', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    hashPassword,
    comparePasswords,
    generateToken,
    authenticateToken,
    loginUser,
    registerUser
};
