const db = require('../db/database');

const getAllAlbums = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Album", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getFilteredAlbums = (filters) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM Album WHERE 1=1";
        const params = [];

        if (filters.data_wydania) {
            query += " AND data_wydania = ?";
            params.push(filters.data_wydania);
        }
        if (filters.gatunek) {
            query += " AND gatunek = ?";
            params.push(filters.gatunek);
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

const getAlbumById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM Album WHERE id_albumu = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const createAlbum = (albumDTO) => {
    return new Promise((resolve, reject) => {
        const { title, releaseDate, genre, artistId } = albumDTO;
        db.run(
            "INSERT INTO Album (tytul, data_wydania, gatunek, id_artysty) VALUES (?, ?, ?, ?)",
            [title, releaseDate, genre, artistId],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id_albumu: this.lastID });
                }
            }
        );
    });
};

const updateAlbum = (id, albumDTO) => {
    return new Promise((resolve, reject) => {
        const { title, releaseDate, genre, artistId } = albumDTO;
        db.run(
            "UPDATE Album SET tytul = ?, data_wydania = ?, gatunek = ?, id_artysty = ? WHERE id_albumu = ?",
            [title, releaseDate, genre, artistId, id],
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

const deleteAlbum = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM Album WHERE id_albumu = ?", [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

module.exports = {
    getAllAlbums,
    getAlbumById,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getFilteredAlbums
};
