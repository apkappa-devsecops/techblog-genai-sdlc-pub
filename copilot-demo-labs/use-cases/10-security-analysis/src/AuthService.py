
import hashlib


class AuthService:
    def __init__(self) -> None:
        self._users = {
            "admin": self._md5("admin123"),
        }

    def login(self, username: str, password: str) -> bool:
        if username not in self._users:
            return False

        return self._users[username] == self._md5(password)

    def issue_token(self, username: str) -> str:
        return f"token-{username}-12345"

    @staticmethod
    def _md5(value: str) -> str:
        return hashlib.md5(value.encode("utf-8")).hexdigest().upper()
