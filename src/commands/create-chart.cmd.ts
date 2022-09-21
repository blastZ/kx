import chalk from "chalk";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { $ } from "zx";

import { BOILERPLATE_PATH, WSP_PATH } from "../constants/path.constant.js";
import { Values } from "../interfaces/values.interface.js";
import { createValuesFile } from "../utils/create-values-file.util.js";
import { generateCommonEnvTemplate } from "../utils/generate-common-env-template.util.js";
import { getSdkVersion } from "../utils/get-sdk-version.util.js";
import { getValuePromptList } from "../utils/get-value-prompt-list.util.js";
import { isPathExist } from "../utils/is-path-exist.util.js";
import { parseAnswersToValues } from "../utils/parse-answers-to-values.util.js";
import { replaceFileContent } from "../utils/replace-file-content.util.js";

async function _createChart(name: string, values?: Values) {
  const APP_PATH = path.resolve(WSP_PATH, `./${name}`);

  if (await isPathExist(APP_PATH)) {
    return console.log(
      chalk.red.bold(
        `ERR_CHART_NAME_EXIST: the application name "${name}" already exists`,
      ),
    );
  }

  await $`mkdir ${APP_PATH}`.quiet();

  await $`cp -r ${path.resolve(BOILERPLATE_PATH, "./templates")} ${path.resolve(
    APP_PATH,
    `./templates`,
  )}`.quiet();

  await generateCommonEnvTemplate(APP_PATH);

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

  await $`mkdir ${APP_PATH}/configmaps`.quiet();

  fs.writeFileSync(
    path.resolve(APP_PATH, "./Chart.yaml"),
    Buffer.from(
      replaceFileContent({
        filePath: path.resolve(BOILERPLATE_PATH, "./Chart.yaml"),
        replaceMap: {
          REPLACE_WITH_APP_NAME: name,
          REPLACE_WITH_APP_VERSION: values ? values.appVersion : "1.0.0",
        },
      }),
    ),
  );
}

export async function createChart(name: string, cmd: any) {
  const createValues = cmd.values;

  if (createValues) {
    inquirer.prompt([...(await getValuePromptList())]).then(async (answers) => {
      const values = parseAnswersToValues(answers);

      await _createChart(name, values);

      await createValuesFile(name, values);
    });
  } else {
    await _createChart(name);
  }
}
