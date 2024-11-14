const userDAO = require('../dao/userDAO');

const getAllUsers = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const users = await userDAO.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {

        if (req.user.role != 1 && req.user.id != req.params.id) {
            return res.status(403).json({ message: 'You do not have permission' });
        }

        const user = await userDAO.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//TODO es
const createUser = async (req, res) => {
    try {
        const { username, password, email, role, status } = req.body;
        const userDTO = new userDTO(null, username, password, email, role, status);
        const result = await userDAO.createUser(userDTO);
        res.status(201).json({ message: 'User created', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateUser = async (req, res) => {
    try {

        //TODO dodac cos podobnego dla uzytkownika
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }

        const { id } = req.params;
        const { username, password, email, role, status } = req.body;
        const userDTO = new userDTO(id, username, password, email, role, status);
        const result = await userDAO.updateUser(id, userDTO);
        if (result.changes) {
            res.status(200).json({ message: 'User updated' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }

        const deletedUser = await userDAO.deleteUser(req.params.id);
        if (deletedUser.changes > 0) {
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
