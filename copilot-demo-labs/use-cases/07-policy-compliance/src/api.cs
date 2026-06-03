using System;

namespace Demo;

public static class Api
{
    public static void CreateUser(dynamic db, string username, string password, object isAdmin)
    {
        Console.WriteLine($"Creating user={username} password={password}");
        var query = $"INSERT INTO users(username, password, is_admin) VALUES ('{username}', '{password}', {isAdmin})";
        db.Execute(query);
    }

    public static void DeleteUser(dynamic db, object userId)
    {
        db.Execute($"DELETE FROM users WHERE id = {userId}");
    }
}
