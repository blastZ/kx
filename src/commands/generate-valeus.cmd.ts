import chalk from "chalk";
import inquirer from "inquirer";
import { $, quiet } from "zx";
import path from "path";
import fs from "fs";

import { WSP_PATH } from "../constants/path.constant.js";
import { Values } from "../interfaces/values.interface.js";
import { createValuesFile } from "../utils/create-values-file.util.js";
import { getValuePromptList } from "../utils/get-value-prompt-list.util.js";
import { parseAnswersToValues } from "../utils/parse-answers-to-values.util.js";

async function _generateValues(name: string, values: Values) {
  createValuesFile(name, values, {
    useAppFileName: true,
  });

  await quiet($`mkdir ${path.resolve(WSP_PATH, `./configmaps/${name}`)}`);
}

export function generateValues(resource: string, name: string) {
  if (!["values"].includes(resource)) {
    return console.log(
      chalk.red.bold(
        'ERR_INVALID_RESOURCE_TYPE: resource type should be one of ["values"]',
      ),
    );
  }

  try {
    fs.statSync(path.resolve(WSP_PATH, `./values-${name}.yaml`));

    return console.log(
      chalk.red.bold(
        `ERR_VALUES_FILE_EXIST: the values file of application "${name}" already exists`,
      ),
    );
  } catch (err) {}

  try {
    fs.statSync(path.resolve(WSP_PATH, `./Chart.yaml`));
  } catch (err) {
    return console.log(
      chalk.red.bold(`ERR_CHART_NOT_FOUND: chart don't exist`),
    );
  }

  inquirer.prompt([...getValuePromptList()]).then(async (answers) => {
    await _generateValues(name, parseAnswersToValues(answers));
  });
}
