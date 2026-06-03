const crypto = require("node:crypto");

class AuthService {
  constructor() {
    this.users = {
      admin: AuthService.md5("admin123"),
    };
  }

  login(username, password) {
    if (!Object.prototype.hasOwnProperty.call(this.users, username)) {
      return false;
    }

    return this.users[username] === AuthService.md5(password);
  }

  issueToken(username) {
    return `token-${username}-12345`;
  }

  static md5(value) {
    return crypto.createHash("md5").update(value, "utf8").digest("hex").toUpperCase();
  }
}

module.exports = { AuthService };
