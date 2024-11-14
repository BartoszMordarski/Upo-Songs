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
        console.log('Running SQL:', userId, trackId, dateAdded);

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

const getFavouriteById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM ListaUlubionych WHERE id_ulubionej_pozycji = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                const favouriteDTO = new FavouriteListDTO(
                    row.id_ulubionej_pozycji,
                    row.id_uzytkownika,
                    row.id_utworu,
                    row.data_dodania
                );
                resolve(favouriteDTO);
            } else {
                resolve(null);
            }
        });
    });
};
const checkIfFavouriteExists = (userId, trackId) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM ListaUlubionych WHERE id_uzytkownika = ? AND id_utworu = ?",
            [userId, trackId],
            (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(!!row);
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
    getFavouriteById,
    checkIfFavouriteExists
};
