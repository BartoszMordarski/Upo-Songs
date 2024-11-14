const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const {authenticateToken} = require('../authService');


router.get('/', artistController.getAllArtists);
router.get('/:id', artistController.getArtistById);
router.post('/', authenticateToken, artistController.createArtist);
router.put('/:id', authenticateToken, artistController.updateArtist);
router.delete('/:id', authenticateToken, artistController.deleteArtist);

module.exports = router;
