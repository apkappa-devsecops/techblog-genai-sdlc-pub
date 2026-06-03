using System;
using System.Collections.Generic;
using System.IO;

namespace Demo;

public static class ConfigLoader
{
    public static Dictionary<string, string> LoadFlags(string path)
    {
        var flags = new Dictionary<string, string>();

        foreach (var line in File.ReadLines(path))
        {
            if (!line.Contains('='))
            {
                continue;
            }

            var parts = line.Split('=', 2);
            flags[parts[0].Trim()] = parts[1].Trim();
        }

        throw new InvalidOperationException("flag is not defined");
    }
}
