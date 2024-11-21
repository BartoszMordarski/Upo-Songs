const TrackDAO = require('../dao/TrackDAO');
const TrackDTO = require('../models/TrackDTO');

//TODO date mozna zmienic na sam rok
const getAllTracks = async (req, res) => {
    try {
        const { gatunek, data_wydania, id_artysty } = req.query;
        const filters = {};
        if (gatunek) filters.gatunek = gatunek;
        if (data_wydania) filters.data_wydania = data_wydania;
        if (id_artysty) filters.id_artysty = id_artysty;

        const tracks = await TrackDAO.getFilteredTracks(filters);
        res.json(tracks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tracks.' });
    }
};

const getTrackById = async (req, res) => {
    try {
        const { id } = req.params;
        const track = await TrackDAO.getTrackById(id);
        if (track) {
            res.status(200).json(track);
        } else {
            res.status(404).json({ message: 'Track not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createTrack = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { title, duration, albumId, artistId, genre, releaseDate, playCount } = req.body;
        const trackDTO = new TrackDTO(null, title, duration, albumId, artistId, genre, releaseDate, playCount);
        const result = await TrackDAO.createTrack(trackDTO);
        res.status(201).json({ message: 'Track created', id: result.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateTrack = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { id } = req.params;
        const { title, duration, albumId, artistId, genre, releaseDate, playCount } = req.body;
        const trackDTO = new TrackDTO(id, title, duration, albumId, artistId, genre, releaseDate, playCount);
        const result = await TrackDAO.updateTrack(id, trackDTO);
        if (result.changes) {
            res.status(200).json({ message: 'Track updated' });
        } else {
            res.status(404).json({ message: 'Track not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTrack = async (req, res) => {
    try {
        if (req.user.role != 1) {
            return res.status(403).json({ message: 'You do not have permission' });
        }
        const { id } = req.params;
        const result = await TrackDAO.deleteTrack(id);
        if (result.changes) {
            res.status(200).json({ message: 'Track deleted' });
        } else {
            res.status(404).json({ message: 'Track not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTracks,
    getTrackById,
    createTrack,
    updateTrack,
    deleteTrack,
};
