class ArtistDTO {
    constructor(id, name, description, countryOfOrigin, playCount, isVerified) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.countryOfOrigin = countryOfOrigin;
        this.playCount = playCount;
        this.isVerified = isVerified;
    }
}

module.exports = ArtistDTO;
