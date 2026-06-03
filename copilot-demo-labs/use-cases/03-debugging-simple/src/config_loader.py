def load_flags(path: str) -> dict[str, str]:
    flags: dict[str, str] = {}

    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if "=" in line:
                k, v = line.split("=", 1)
                flags[k.strip()] = v.strip()

    return flag
