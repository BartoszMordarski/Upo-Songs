const db = require('../db/database');
const FavouriteListDTO = require('../models/favouriteListDTO');

const getAllFavouritesByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM ListaUlubionych WHERE id_uzytkownika = ?", [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const addToFavourites = (favouriteListDTO) => {
    return new Promise((resolve, reject) => {
        const { userId, trackId, dateAdded } = favouriteListDTO;
        db.run(
            "INSERT INTO ListaUlubionych (id_uzytkownika, id_utworu, data_dodania) VALUES (?, ?, ?)",
            [userId, trackId, dateAdded],
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

const updateFavourite = (id, favouriteListDTO) => {
    return new Promise((resolve, reject) => {
        const { userId, trackId, dateAdded } = favouriteListDTO;
        db.run(
            "UPDATE ListaUlubionych SET id_uzytkownika = ?, id_utworu = ?, data_dodania = ? WHERE id_ulubionej_pozycji = ?",
            [userId, trackId, dateAdded, id],
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

const removeFavourite = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM ListaUlubionych WHERE id_ulubionej_pozycji = ?", [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

module.exports = {
    getAllFavouritesByUserId,
    addToFavourites,
    updateFavourite,
    removeFavourite,
};
