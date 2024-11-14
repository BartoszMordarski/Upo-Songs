const db = require('../db/database');
const UserDTO = require("../models/userDTO");

const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM Uzytkownicy", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM Uzytkownicy WHERE id_uzytkownika = ?", [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

//TODO zmienic to
const getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT * FROM Uzytkownicy WHERE nazwa_uzytkownika = ?", [username], (err, row) => {
            if (err) {
                reject(err);
            } else if (row) {
                const userDTO = new UserDTO(
                    row.id_uzytkownika,
                    row.nazwa_uzytkownika,
                    row.haslo,
                    row.email,
                    row.rola,
                    row.status_konta
                );
                resolve(userDTO);
            } else {
                resolve(null);
            }
        });
    });
};

const createUser = (userDTO) => {
    return new Promise((resolve, reject) => {
        const { username, password, email, role, status } = userDTO;
        db.run(
            "INSERT INTO Uzytkownicy (nazwa_uzytkownika, haslo, email, rola, status_konta) VALUES (?, ?, ?, ?, ?)",
            [username, password, email, role, status],
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

const updateUser = (id, userDTO) => {
    return new Promise((resolve, reject) => {
        const { username, password, email, role, status } = userDTO;
        db.run(
            "UPDATE Uzytkownicy SET nazwa_uzytkownika = ?, haslo = ?, email = ?, rola = ?, status_konta = ? WHERE id_uzytkownika = ?",
            [username, password, email, role, status, id],
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

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM Uzytkownicy WHERE id_uzytkownika = ?", [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ changes: this.changes });
            }
        });
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByUsername
};
