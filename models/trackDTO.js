class TrackDTO {
    constructor(id, title, duration, albumId, artistId, genre, releaseDate, playCount) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.albumId = albumId;
        this.artistId = artistId;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.playCount = playCount;
    }
}

module.exports = TrackDTO;