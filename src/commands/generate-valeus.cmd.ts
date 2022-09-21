import chalk from "chalk";
import inquirer from "inquirer";
import path from "path";
import { $ } from "zx";

import { WSP_PATH } from "../constants/path.constant.js";
import { Values } from "../interfaces/values.interface.js";
import { createValuesFile } from "../utils/create-values-file.util.js";
import { getValuePromptList } from "../utils/get-value-prompt-list.util.js";
import { isPathExist } from "../utils/is-path-exist.util.js";
import { parseAnswersToValues } from "../utils/parse-answers-to-values.util.js";

async function _generateValues(name: string, values: Values) {
  createValuesFile(name, values, {
    useAppFileName: true,
  });

  await $`mkdir ${path.resolve(WSP_PATH, `./configmaps/${name}`)}`.quiet();
}

export async function generateValues(resource: string, name: string) {
  if (!["values"].includes(resource)) {
    return console.log(
      chalk.red.bold(
        'ERR_INVALID_RESOURCE_TYPE: resource type should be one of ["values"]',
      ),
    );
  }

  if (await isPathExist(path.resolve(WSP_PATH, `./values-${name}.yaml`))) {
    return console.log(
      chalk.red.bold(
        `ERR_VALUES_FILE_EXIST: the values file of application "${name}" already exists`,
      ),
    );
  }

  if (!(await isPathExist(path.resolve(WSP_PATH, `./Chart.yaml`)))) {
    return console.log(
      chalk.red.bold(`ERR_CHART_NOT_FOUND: chart don't exist`),
    );
  }

  inquirer.prompt([...(await getValuePromptList())]).then(async (answers) => {
    await _generateValues(name, parseAnswersToValues(answers));
  });
}
