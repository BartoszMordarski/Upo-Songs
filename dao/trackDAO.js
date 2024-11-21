const db = require('../db/database');

const getAllTracks = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Utwor", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getFilteredTracks = (filters) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM Utwor WHERE 1=1";
        const params = [];

        if (filters.gatunek) {
            query += " AND gatunek = ?";
            params.push(filters.gatunek);
        }
        if (filters.data_wydania) {
            query += " AND data_wydania = ?";
            params.push(filters.data_wydania);
        }
        if (filters.id_artysty) {
            query += " AND id_artysty = ?";
            params.push(filters.id_artysty);
        }

        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getTrackById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM Utwor WHERE id_utworu = ?",
            [id],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            }
        );
    });
};

const createTrack = (trackDTO) => {
    return new Promise((resolve, reject) => {
        const { title, duration, albumId, artistId, genre, releaseDate, playCount } = trackDTO;
        db.run(
            "INSERT INTO Utwor (tytul, czas_trwania, id_albumu, id_artysty, gatunek, data_wydania, liczba_odtworzen) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, duration, albumId, artistId, genre, releaseDate, playCount],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID });
                }
            }
        );
    });
};

const updateTrack = (id, trackDTO) => {
    return new Promise((resolve, reject) => {
        const { title, duration, albumId, artistId, genre, releaseDate, playCount } = trackDTO;
        db.run(
            "UPDATE Utwor SET tytul = ?, czas_trwania = ?, id_albumu = ?, id_artysty = ?, gatunek = ?, data_wydania = ?, liczba_odtworzen = ? WHERE id_utworu = ?",
            [title, duration, albumId, artistId, genre, releaseDate, playCount, id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            }
        );
    });
};

const deleteTrack = (id) => {
    return new Promise((resolve, reject) => {
        db.run(
            "DELETE FROM Utwor WHERE id_utworu = ?",
            [id],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes });
                }
            }
        );
    });
};

module.exports = {
    getAllTracks,
    getFilteredTracks,
    getTrackById,
    createTrack,
    updateTrack,
    deleteTrack,
};
