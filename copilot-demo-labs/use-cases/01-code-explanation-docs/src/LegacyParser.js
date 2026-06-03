/**
 * Parses INI-style config lines into a nested object structure.
 * @param {string[]} lines - Array of config lines
 * @returns {Object} Parsed config object
 */
function parseConfig(lines) {
  const data = {};
  let section = null;
  for (let raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    if (line.startsWith('[') && line.endsWith(']')) {
      const sectionName = line.slice(1, -1);
      section = {};
      data[sectionName] = section;
      continue;
    }
    const idx = line.indexOf('=');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (section === null) {
        data[key] = value;
      } else {
        section[key] = value;
      }
    }
  }
  return data;
}

function runLabVariant(payload) {
  // Expects payload.lines to be an array of strings
  if (!payload || !Array.isArray(payload.lines)) {
    throw new Error("Payload must have a 'lines' array");
  }
  return parseConfig(payload.lines);
}

module.exports = { runLabVariant };
