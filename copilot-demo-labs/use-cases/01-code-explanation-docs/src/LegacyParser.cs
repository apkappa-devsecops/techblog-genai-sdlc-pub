namespace Demo;

public static class LegacyParser
{
    public static Dictionary<string, object> ParseConfig(IEnumerable<string> lines)
    {
        var data = new Dictionary<string, object>();
        Dictionary<string, string>? section = null;

        foreach (var raw in lines)
        {
            var line = raw.Trim();
            if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#"))
            {
                continue;
            }

            if (line.StartsWith("[") && line.EndsWith("]"))
            {
                var sectionName = line[1..^1];
                section = new Dictionary<string, string>();
                data[sectionName] = section;
                continue;
            }

            var idx = line.IndexOf('=');
            if (idx > 0)
            {
                var key = line[..idx].Trim();
                var value = line[(idx + 1)..].Trim();
                if (section is null)
                {
                    data[key] = value;
                }
                else
                {
                    section[key] = value;
                }
            }
        }

        return data;
    }
}
