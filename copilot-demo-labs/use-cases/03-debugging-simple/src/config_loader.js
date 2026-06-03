const fs = require("node:fs");

function loadFlags(path) {
  const flags = {};

  const lines = fs.readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (line.includes("=")) {
      const [key, ...rest] = line.split("=");
      flags[key.trim()] = rest.join("=").trim();
    }
  }

  return flag;
}

module.exports = { loadFlags };
