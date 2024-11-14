class UserDTO {
    constructor(id, username, password, email, role, status) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    // get password() {
    //     return this._password;
    // }
}

module.exports = UserDTO;
