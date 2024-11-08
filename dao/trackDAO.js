const db = require('../db/database');
const FavouriteListDTO = require('../models/trackDTO');

class TrackDAO {
    static getAllTracks() {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Utwor', (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }

    static getTrackById(id) {
        return new Promise((resolve, reject) => {
            db.get('SELECT * FROM Utwor WHERE id_utworu = ?', [id], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }

    static createTrack(trackDTO) {
        return new Promise((resolve, reject) => {
            const { title, duration, albumId, artistId, genre, releaseDate, playCount } = trackDTO;
            db.run(
                'INSERT INTO Utwor (tytul, czas_trwania, id_albumu, id_artysty, gatunek, data_wydania, liczba_odtworzen) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [title, duration, albumId, artistId, genre, releaseDate, playCount],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ id: this.lastID });
                }
            );
        });
    }

    static updateTrack(id, trackDTO) {
        return new Promise((resolve, reject) => {
            const { title, duration, albumId, artistId, genre, releaseDate, playCount } = trackDTO;
            db.run(
                'UPDATE Utwor SET tytul = ?, czas_trwania = ?, id_albumu = ?, id_artysty = ?, gatunek = ?, data_wydania = ?, liczba_odtworzen = ? WHERE id_utworu = ?',
                [title, duration, albumId, artistId, genre, releaseDate, playCount, id],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve({ changes: this.changes });
                }
            );
        });
    }

    static deleteTrack(id) {
        return new Promise((resolve, reject) => {
            db.run('DELETE FROM Utwor WHERE id_utworu = ?', [id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    }
}

module.exports = TrackDAO;
