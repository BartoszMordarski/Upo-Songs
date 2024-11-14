const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');
const {authenticateToken} = require("../authService");

router.get('/', trackController.getAllTracks);
router.get('/:id', trackController.getTrackById);
router.post('/',authenticateToken, trackController.createTrack);
router.put('/:id',authenticateToken, trackController.updateTrack);
router.delete('/:id',authenticateToken, trackController.deleteTrack);

module.exports = router;
