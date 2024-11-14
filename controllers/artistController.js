const artistDAO = require('../dao/artistDAO');
const ArtistDTO = require('../models/ArtistDTO');

const getAllArtists = async (req, res) => {
    try {
        const artists = await artistDAO.getAllArtists();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getArtistById = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await artistDAO.getArtistById(id);
        if (artist) {
            res.status(200).json(artist);
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createArtist = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { name, description, countryOfOrigin, playCount, isVerified } = req.body;
        const artistDTO = new ArtistDTO(null, name, description, countryOfOrigin, playCount, isVerified);
        const result = await artistDAO.createArtist(artistDTO);
        res.status(201).json({ message: 'Artist created', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateArtist = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { id } = req.params;
        const { name, description, countryOfOrigin, playCount, isVerified } = req.body;
        const artistDTO = new ArtistDTO(id, name, description, countryOfOrigin, playCount, isVerified);
        const result = await artistDAO.updateArtist(id, artistDTO);
        if (result.changes) {
            res.status(200).json({ message: 'Artist updated' });
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteArtist = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { id } = req.params;
        const result = await artistDAO.deleteArtist(id);
        if (result.changes) {
            res.status(200).json({ message: 'Artist deleted' });
        } else {
            res.status(404).json({ message: 'Artist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
};
