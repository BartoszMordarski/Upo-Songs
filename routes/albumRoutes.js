const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const {authenticateToken} = require('../authService');


router.get('/', albumController.getAllAlbums);
router.get('/:id', albumController.getAlbumById);
router.post('/', authenticateToken, albumController.createAlbum);
router.put('/:id', authenticateToken, albumController.updateAlbum);
router.delete('/:id', authenticateToken, albumController.deleteAlbum);

module.exports = router;
