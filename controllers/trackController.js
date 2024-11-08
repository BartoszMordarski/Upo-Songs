const TrackDAO = require('../dao/TrackDAO');
const TrackDTO = require('../models/TrackDTO');

const getAllTracks = async (req, res) => {
    try {
        const tracksData = await TrackDAO.getAllTracks();
        res.status(200).json(tracksData);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
