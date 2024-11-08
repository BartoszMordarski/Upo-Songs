const favouriteListDAO = require('../dao/favouriteListDAO');
const FavouriteListDTO = require('../models/favouriteListDTO');

const getAllFavouritesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const favourites = await favouriteListDAO.getAllFavouritesByUserId(userId);
        res.status(200).json(favourites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addToFavourites = async (req, res) => {
    try {
        const { userId, trackId, dateAdded } = req.body;
        const favouriteListDTO = new FavouriteListDTO(null, userId, trackId, dateAdded);
        const result = await favouriteListDAO.addToFavourites(favouriteListDTO);
        res.status(201).json({ message: 'Track added to favourites', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateFavourite = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, trackId, dateAdded } = req.body;
        const favouriteListDTO = new FavouriteListDTO(id, userId, trackId, dateAdded);
        const result = await favouriteListDAO.updateFavourite(id, favouriteListDTO);
        if (result.changes) {
            res.status(200).json({ message: 'Favourite updated' });
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
    updateFavourite,
    removeFavourite,
};
