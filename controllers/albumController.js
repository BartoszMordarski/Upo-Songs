const albumDAO = require('../dao/albumDAO');
const AlbumDTO = require('../models/AlbumDTO');

const getAllAlbums = async (req, res) => {
    try {
        const albums = await albumDAO.getAllAlbums();
        res.status(200).json(albums);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAlbumById = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await albumDAO.getAlbumById(id);
        if (album) {
            res.status(200).json(album);
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createAlbum = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { title, releaseDate, genre, artistId } = req.body;
        const albumDTO = new AlbumDTO(null, title, releaseDate, genre, artistId);
        const result = await albumDAO.createAlbum(albumDTO);
        res.status(201).json({ message: 'Album created', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAlbum = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { id } = req.params;
        const { title, releaseDate, genre, artistId } = req.body;
        const albumDTO = new AlbumDTO(id, title, releaseDate, genre, artistId);
        const result = await albumDAO.updateAlbum(id, albumDTO);
        if (result.changes) {
            res.status(200).json({ message: 'Album updated' });
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAlbum = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { id } = req.params;
        const result = await albumDAO.deleteAlbum(id);
        if (result.changes) {
            res.status(200).json({ message: 'Album deleted' });
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
};
