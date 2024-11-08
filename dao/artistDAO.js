const db = require('../db/database');

const getAllArtists = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Artysta", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getArtistById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM Artysta WHERE id_artysty = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const createArtist = (artistDTO) => {
    return new Promise((resolve, reject) => {
        const { name, description, countryOfOrigin, playCount, isVerified } = artistDTO;
        db.run(
            "INSERT INTO Artysta (nazwa, opis, kraj_pochodzenia, liczba_odtworzen, czy_zweryfikowany) VALUES (?, ?, ?, ?, ?)",
            [name, description, countryOfOrigin, playCount, isVerified],
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

const updateArtist = (id, artistDTO) => {
    return new Promise((resolve, reject) => {
        const { name, description, countryOfOrigin, playCount, isVerified } = artistDTO;
        db.run(
            "UPDATE Artysta SET nazwa = ?, opis = ?, kraj_pochodzenia = ?, liczba_odtworzen = ?, czy_zweryfikowany = ? WHERE id_artysty = ?",
            [name, description, countryOfOrigin, playCount, isVerified, id],
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

const deleteArtist = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM Artysta WHERE id_artysty = ?", [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

module.exports = {
    getAllArtists,
    getArtistById,
    createArtist,
    updateArtist,
    deleteArtist,
};
