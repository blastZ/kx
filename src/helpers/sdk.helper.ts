import fs from "fs/promises";
import path from "path";

import { BOILERPLATE_PATH, WSP_PATH } from "../constants/path.constant.js";
import { getSdkVersion } from "../utils/get-sdk-version.util.js";
import { replaceFileContent } from "../utils/replace-file-content.util.js";

export class SdkHelper {
  private appPath: string;

  constructor(appName: string) {
    this.appPath = path.resolve(WSP_PATH, `./${appName}`);
  }

  public async updateSdkYamlFile() {
    await fs.writeFile(
      path.resolve(this.appPath, "./sdk.yaml"),
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
}
