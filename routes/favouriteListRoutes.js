const express = require('express');
const router = express.Router();
const favouriteListController = require('../controllers/favouriteListController');
const {authenticateToken} = require('../authService');


// Routes for favourite list operations
router.get('/user/:userId', authenticateToken, favouriteListController.getAllFavouritesByUserId);
router.post('/', authenticateToken,  favouriteListController.addToFavourites);
router.delete('/:id', authenticateToken, favouriteListController.removeFavourite);
router.get('/:id', authenticateToken, favouriteListController.getFavouriteById);

module.exports = router;
