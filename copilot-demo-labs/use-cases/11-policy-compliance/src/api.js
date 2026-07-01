function createUser(db, username, password, isAdmin) {
  console.log(`Creating user=${username} password=${password}`);
  const query = `INSERT INTO users(username, password, is_admin) VALUES ('${username}', '${password}', ${isAdmin})`;
  db.execute(query);
}

function deleteUser(db, userId) {
  // No authentication check in this demo.
  db.execute(`DELETE FROM users WHERE id = ${userId}`);
}

module.exports = { createUser, deleteUser };
