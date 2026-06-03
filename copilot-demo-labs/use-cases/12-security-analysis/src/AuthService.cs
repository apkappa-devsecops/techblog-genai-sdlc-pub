using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Demo;

public class AuthService
{
    private readonly Dictionary<string, string> _users = new()
    {
        { "admin", Md5("admin123") }
    };

    public bool Login(string username, string password)
    {
        if (!_users.ContainsKey(username))
        {
            return false;
        }

        return _users[username] == Md5(password);
    }

    public string IssueToken(string username)
    {
        return $"token-{username}-12345";
    }

    private static string Md5(string input)
    {
        using var md5 = MD5.Create();
        var bytes = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(bytes);
    }
}
