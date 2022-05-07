import fs from "fs";
import path from "path";
import chalk from "chalk";
import { $, quiet } from "zx";
import inquirer from "inquirer";

import { BOILERPLATE_PATH, WSP_PATH } from "../constants/path.constant.js";
import { replaceFileContent } from "../utils/replace-file-content.util.js";
import { appendCommonEnv } from "../utils/append-common-env.util.js";
import { appendService } from "../utils/append-service.util.js";

async function _createChart(
  name: string,
  opts: {
    namespace: string;
    appVersion: string;
    serviceType: string;
    servicePort: string;
    commonEnv: string[];
    owner: string;
    replicaCount: string;
    nodePort?: string;
  },
) {
  const APP_PATH = path.resolve(WSP_PATH, `./${name}`);

  try {
    fs.statSync(APP_PATH);

    return console.log(
      chalk.red.bold(
        `ERR_CHART_NAME_EXIST: the application name "${name}" already exists`,
      ),
    );
  } catch (err) {}

  await quiet($`mkdir ${APP_PATH}`);

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
          REPLACE_WITH_SDK_VERSION: "0.1.0",
        },
      }),
    ),
  );

  await quiet($`mkdir ${APP_PATH}/configmaps`);

  fs.writeFileSync(
    path.resolve(APP_PATH, "./Chart.yaml"),
    Buffer.from(
      replaceFileContent({
        filePath: path.resolve(BOILERPLATE_PATH, "./Chart.yaml"),
        replaceMap: {
          REPLACE_WITH_APP_NAME: name,
          REPLACE_WITH_APP_VERSION: opts.appVersion,
        },
      }),
    ),
  );

  fs.writeFileSync(
    path.resolve(APP_PATH, "./values.yaml"),
    fs.readFileSync(path.resolve(BOILERPLATE_PATH, "./values.yaml")),
  );

  appendService(path.resolve(APP_PATH, "./values.yaml"), opts.serviceType);

  appendCommonEnv(path.resolve(APP_PATH, "./values.yaml"), opts.commonEnv);

  fs.writeFileSync(
    path.resolve(APP_PATH, "./values.yaml"),
    Buffer.from(
      replaceFileContent({
        filePath: path.resolve(APP_PATH, "./values.yaml"),
        replaceMap: {
          REPLACE_WITH_NAMESPACE: opts.namespace,
          REPLACE_WITH_APP_NAME: name,
          REPLACE_WITH_APP_VERSION: opts.appVersion,
          REPLACE_WITH_SERVICE_TYPE: opts.serviceType,
          REPLACE_WITH_SERVICE_PORT: opts.servicePort,
          REPLACE_WITH_NODE_PORT: opts.nodePort || "",
          REPLACE_WITH_OWNER: opts.owner,
          REPLACE_WITH_REPLICA_COUNT: opts.replicaCount,
        },
      }),
    ),
  );
}

export async function createChart(name: string) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "namespace",
        message: "The namespace of application:",
        choices: ["easyv", "dtable"],
      },
      {
        type: "input",
        name: "appVersion",
        message: "The version of application:",
        default: "0.1.0",
      },
      {
        type: "input",
        name: "owner",
        message: "The owner of application:",
        default: "yinbing",
      },
      {
        type: "input",
        name: "replicaCount",
        message: "The replica count of application:",
        default: "1",
        validate(input) {
          if (
            !input ||
            Number.isNaN(Number(input)) ||
            !Number.isInteger(Number(input)) ||
            input < 1 ||
            input > 8
          ) {
            return "Invalid replica count, it should between 1-8";
          }

          return true;
        },
      },
      {
        type: "checkbox",
        name: "commonEnv",
        message: "Check used environments by application:",
        choices: ["postgres", "redis"],
      },
      {
        type: "list",
        name: "serviceType",
        message: "The service type of application:",
        choices: ["ClusterIP", "NodePort"],
      },
      {
        type: "number",
        name: "servicePort",
        message: "The service port of application:",
        default: 80,
      },
      {
        type: "input",
        name: "nodePort",
        message: "The node port of application:",
        validate(input) {
          if (
            !input ||
            Number.isNaN(Number(input)) ||
            !Number.isInteger(Number(input)) ||
            input < 30000 ||
            input > 32767
          ) {
            return "Invalid node port, it should between 30000-32767";
          }

          return true;
        },
        when: (answers) => {
          return answers.serviceType === "NodePort";
        },
      },
    ])
    .then(async (answers) => {
      await _createChart(name, {
        namespace: answers.namespace,
        appVersion: answers.appVersion,
        serviceType: answers.serviceType,
        servicePort: String(Number(answers.servicePort)),
        nodePort: String(Number(answers.nodePort)),
        commonEnv: answers.commonEnv,
        owner: answers.owner,
        replicaCount: String(Number(answers.replicaCount)),
      });
    });
}
