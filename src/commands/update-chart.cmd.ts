import path from "path";
import { $, quiet } from "zx";
import fs from "fs";
import { WSP_PATH, BOILERPLATE_PATH } from "../constants/path.constant.js";
import { replaceFileContent } from "../utils/replace-file-content.util.js";
import { getSdkVersion } from "../utils/get-sdk-version.util.js";

export async function updateChart(name: string) {
  const APP_PATH = path.resolve(WSP_PATH, `./${name}`);

  await quiet($`rm -rf ${path.resolve(APP_PATH, "./templates")}`);

  await quiet(
    $`cp -r ${path.resolve(BOILERPLATE_PATH, "./templates")} ${path.resolve(
      APP_PATH,
      `./templates`,
    )}`,
  );

  fs.writeFileSync(
    path.resolve(APP_PATH, "./sdk.yaml"),
    Buffer.from(
      replaceFileContent({
        filePath: path.resolve(BOILERPLATE_PATH, "./sdk.yaml"),
        replaceMap: {
          REPLACE_WITH_SDK_VERSION: getSdkVersion(),
        },
      }),
    ),
  );
}
