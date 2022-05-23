import fs from "fs";
import path from "path";
import chalk from "chalk";
import { $, quiet } from "zx";
import inquirer from "inquirer";

import { BOILERPLATE_PATH, WSP_PATH } from "../constants/path.constant.js";
import { replaceFileContent } from "../utils/replace-file-content.util.js";
import { appendCommonEnv } from "../utils/append-common-env.util.js";
import { appendService } from "../utils/append-service.util.js";
import { getSdkVersion } from "../utils/get-sdk-version.util.js";
import { namespacePrompt } from "../prompts/namespace.prompt.js";
import {
  applicationVersionPrompt,
  applicationOwnerPrompt,
} from "../prompts/application/index.js";
import {
  serviceTypePrompt,
  servicePortPrompt,
  serviceNodePortPrompt,
} from "../prompts/service/index.js";
import { commonEnvPrompt } from "../prompts/common-env.prompt.js";
import { replicaCountPrompt } from "../prompts/replica-count.prompt.js";
import { probePrompt } from "../prompts/probe.prompt.js";

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
    probeHttpGetPath: string;
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
          REPLACE_WITH_SDK_VERSION: getSdkVersion(),
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
          REPLACE_WITH_PROBE_HTTP_GET_PATH: opts.probeHttpGetPath,
        },
      }),
    ),
  );
}

export async function createChart(name: string) {
  inquirer
    .prompt([
      namespacePrompt,
      applicationVersionPrompt,
      applicationOwnerPrompt,
      replicaCountPrompt,
      commonEnvPrompt,
      serviceTypePrompt,
      servicePortPrompt,
      serviceNodePortPrompt,
      probePrompt,
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
        probeHttpGetPath: answers.probeHttpGetPath,
      });
    });
}
