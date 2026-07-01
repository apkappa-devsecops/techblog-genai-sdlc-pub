
def create_user(db, username: str, password: str, is_admin):
    print(f"Creating user={username} password={password}")
    query = (
        f"INSERT INTO users(username, password, is_admin) VALUES ('{username}', '{password}', {is_admin})"
    )
    db.execute(query)


def delete_user(db, user_id):
    db.execute(f"DELETE FROM users WHERE id = {user_id}")
