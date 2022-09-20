import fs from "fs/promises";

export async function isPathExist(path: string) {
  try {
    await fs.stat(path);

    return true;
  } catch (err) {
    return false;
  }
}
