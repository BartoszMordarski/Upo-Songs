const express = require('express');
const router = express.Router();
const favouriteListController = require('../controllers/favouriteListController');

// Routes for favourite list operations
router.get('/:userId', favouriteListController.getAllFavouritesByUserId);
router.post('/', favouriteListController.addToFavourites);
router.put('/:id', favouriteListController.updateFavourite);
router.delete('/:id', favouriteListController.removeFavourite);

module.exports = router;
