class FavouriteListDTO {
    constructor(id, userId, trackId, dateAdded) {
        this.id = id;
        this.userId = userId;
        this.trackId = trackId;
        this.dateAdded = dateAdded;
    }
}

module.exports = FavouriteListDTO;
