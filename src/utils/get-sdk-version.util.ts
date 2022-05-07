import path from "path";
import fs from "fs";
import { MY_PATH } from "../constants/path.constant.js";

export function getSdkVersion() {
  const packageStr = fs
    .readFileSync(path.resolve(MY_PATH, "../../package.json"))
    .toString();

  const packageInfo = JSON.parse(packageStr);

  return packageInfo.version;
}
