const favouriteListDAO = require('../dao/favouriteListDAO');
const FavouriteListDTO = require('../models/favouriteListDTO');

const getAllFavouritesByUserId = async (req, res) => {
    try {

        const { userId } = req.params;

        if (req.user.role != 1 && req.user.id != userId) {
            return res.status(403).json({ message: 'You do not have permission to see this users list' });
        }
        const favourites = await favouriteListDAO.getAllFavouritesByUserId(userId);
        res.status(200).json(favourites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addToFavourites = async (req, res) => {
    try {
        const { trackId } = req.body;

        const exists = await favouriteListDAO.checkIfFavouriteExists(req.user.id, trackId);
        if (exists) {
            return res.status(400).json({ message: 'Track already exists in your favourites' });
        }

        const dateAdded = new Date().toISOString().split('T')[0];
        const favouriteListDTO = new FavouriteListDTO(null, req.user.id, trackId, dateAdded);

        const result = await favouriteListDAO.addToFavourites(favouriteListDTO);
        res.status(201).json({ message: 'Track added to favourites', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFavouriteById = async (req, res) => {
    try {
        const { id } = req.params;

        const favouriteDTO = await favouriteListDAO.getFavouriteById(id);


        if (favouriteDTO) {
            res.status(200).json(favouriteDTO);
        } else {
            res.status(404).json({ message: 'Favourite not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFavourite = async (req, res) => {
    try {
        const { id } = req.params;

        const favouriteDTO = await favouriteListDAO.getFavouriteById(id);
        const userId = favouriteDTO.userId;

        if (req.user.role != 1 && req.user.id != userId) {
            return res.status(403).json({ message: 'You do not have permission' });
        }

        const result = await favouriteListDAO.removeFavourite(id);

        if (result.changes) {
            res.status(200).json({ message: 'Favourite removed' });
        } else {
            res.status(404).json({ message: 'Favourite not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllFavouritesByUserId,
    addToFavourites,
    removeFavourite,
    getFavouriteById
};
