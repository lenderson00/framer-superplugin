import fs from "fs";

export function isWriteable(directory: string): boolean {
  try {
    fs.accessSync(directory, (fs.constants || fs).W_OK);
    return true;
  } catch (err) {
    return false;
  }
}