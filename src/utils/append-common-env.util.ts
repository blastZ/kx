import fs from "fs";

export function appendCommonEnv(targetPath: string, commonEnv: string[]) {
  if (commonEnv.length > 0) {
    fs.appendFileSync(targetPath, "\n" + "commonEnv:");

    commonEnv.map((key) => {
      fs.appendFileSync(targetPath, "\n" + `  - ${key}`);
    });

    fs.appendFileSync(targetPath, "\n");
  }
}
