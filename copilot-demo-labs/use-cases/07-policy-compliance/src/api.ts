export interface Db {
  execute(query: string): void;
}

export function createUser(db: Db, username: string, password: string, isAdmin: boolean | number): void {
  console.log(`Creating user=${username} password=${password}`);
  const query = `INSERT INTO users(username, password, is_admin) VALUES ('${username}', '${password}', ${isAdmin})`;
  db.execute(query);
}

export function deleteUser(db: Db, userId: string | number): void {
  db.execute(`DELETE FROM users WHERE id = ${userId}`);
}
