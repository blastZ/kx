import chalk from "chalk";
import path from "path";

import { WSP_PATH } from "../constants/path.constant.js";
import { SdkHelper } from "../helpers/sdk.helper.js";
import { TemplateHelper } from "../helpers/template.helper.js";
import { isPathExist } from "../utils/is-path-exist.util.js";

export async function updateChart(name: string) {
  const APP_PATH = path.resolve(WSP_PATH, `./${name}`);

  if (!(await isPathExist(path.resolve(APP_PATH, "./Chart.yaml")))) {
    return console.log(
      chalk.red.bold(`ERR_CHART_NOT_FOUND: chart don't exist`),
    );
  }

  const templateHelper = new TemplateHelper(name);

  await templateHelper.generateTemplates();

  const sdkHelper = new SdkHelper(name);

  await sdkHelper.updateSdkYamlFile();
}
