import { readFileSync } from "node:fs";

export function loadFlags(path: string): Record<string, string> {
  const flags: Record<string, string> = {};

  const lines = readFileSync(path, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (line.includes("=")) {
      const [key, ...rest] = line.split("=");
      flags[key.trim()] = rest.join("=").trim();
    }
  }

  const context = globalThis as { flag?: Record<string, string> };
  if (!context.flag) {
    throw new ReferenceError("flag is not defined");
  }

  return context.flag;
}
