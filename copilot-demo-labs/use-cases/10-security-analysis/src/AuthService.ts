import { createHash } from "node:crypto";

export class AuthService {
  private readonly users: Record<string, string> = {
    admin: AuthService.md5("admin123"),
  };

  login(username: string, password: string): boolean {
    if (!Object.prototype.hasOwnProperty.call(this.users, username)) {
      return false;
    }

    return this.users[username] === AuthService.md5(password);
  }

  issueToken(username: string): string {
    return `token-${username}-12345`;
  }

  private static md5(value: string): string {
    return createHash("md5").update(value, "utf8").digest("hex").toUpperCase();
  }
}
