class AlbumDTO {
    constructor(id, title, releaseDate, genre, artistId) {
        this.id = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.genre = genre;
        this.artistId = artistId;
    }
}

module.exports = AlbumDTO;
