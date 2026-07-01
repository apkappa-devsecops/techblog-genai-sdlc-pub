
def parse_config(lines):
    data = {}
    section = None
    for raw in lines:
        line = raw.strip()
        if not line or line.startswith('#'):
            continue
        if line.startswith('[') and line.endswith(']'):
            section_name = line[1:-1]
            section = {}
            data[section_name] = section
            continue
        idx = line.find('=')
        if idx > 0:
            key = line[:idx].strip()
            value = line[idx+1:].strip()
            if section is None:
                data[key] = value
            else:
                section[key] = value
    return data

def run_lab_variant(payload: dict) -> dict:
    # Expects payload['lines'] to be a list of strings
    if not payload or 'lines' not in payload or not isinstance(payload['lines'], list):
        raise ValueError("Payload must have a 'lines' list")
    return parse_config(payload['lines'])
