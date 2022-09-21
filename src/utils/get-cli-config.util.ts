import chalk from "chalk";
import { readFile } from "fs/promises";
import { resolve } from "path";
import { WSP_PATH } from "../constants/path.constant.js";

import { Config } from "../interfaces/config.interface.js";
import { deepmerge } from "./deepmerge.util.js";
import { isPathExist } from "./is-path-exist.util.js";

const defaultConfig: Config = {
  prompt: {
    namespaces: ["default"],
    application: {
      owner: "",
      version: "0.1.0",
      replicaCount: 1,
    },
  },
  envs: {},
};

let parsedConfig: Config;

export async function getCliConfig() {
  if (parsedConfig) {
    return parsedConfig;
  }

  const targetPathList = WSP_PATH.split("/");

  while (targetPathList.length > 0) {
    try {
      const targetPath = targetPathList.join("/");

      targetPathList.pop();

      const filePath = resolve(targetPath, "./kx-cli.json");

      if (!(await isPathExist(filePath))) {
        continue;
      }

      console.log(chalk.gray(`kx config load from "${filePath}"`));

      const config = (await readFile(filePath)).toString();

      parsedConfig = deepmerge(defaultConfig, JSON.parse(config));

      return parsedConfig;
    } catch (err) {
      console.log(
        chalk.red.bold(`ERR_PARSE_CLI_CONFIG: parse cli config failed`),
      );

      break;
    }
  }

  parsedConfig = defaultConfig;

  return parsedConfig;
}
