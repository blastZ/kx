import fs from "fs";
import path from "path";

import { BOILERPLATE_PATH, WSP_PATH } from "../constants/path.constant.js";
import { Values } from "../interfaces/values.interface.js";
import { appendCommonEnv } from "./append-common-env.util.js";
import { appendService } from "./append-service.util.js";
import { replaceFileContent } from "./replace-file-content.util.js";

export function createValuesFile(
  name: string,
  values: Values,
  opts?: {
    useAppFileName?: boolean;
  },
) {
  const options = {
    useAppFileName: false,
    ...opts,
  };

  const APP_PATH = options.useAppFileName
    ? WSP_PATH
    : path.resolve(WSP_PATH, `./${name}`);

  const VALUES_FILE_PATH = options.useAppFileName
    ? path.resolve(APP_PATH, `./values-${name}.yaml`)
    : path.resolve(APP_PATH, "./values.yaml");

  fs.writeFileSync(
    VALUES_FILE_PATH,
    fs.readFileSync(path.resolve(BOILERPLATE_PATH, "./values.yaml")),
  );

  appendService(VALUES_FILE_PATH, values.serviceType);

  appendCommonEnv(VALUES_FILE_PATH, values.commonEnv);

  fs.writeFileSync(
    VALUES_FILE_PATH,
    Buffer.from(
      replaceFileContent({
        filePath: VALUES_FILE_PATH,
        replaceMap: {
          REPLACE_WITH_NAMESPACE: values.namespace,
          REPLACE_WITH_APP_NAME: name,
          REPLACE_WITH_APP_VERSION: values.appVersion,
          REPLACE_WITH_SERVICE_TYPE: values.serviceType,
          REPLACE_WITH_SERVICE_PORT: values.servicePort,
          REPLACE_WITH_NODE_PORT: values.nodePort || "",
          REPLACE_WITH_OWNER: values.owner,
          REPLACE_WITH_REPLICA_COUNT: values.replicaCount,
          REPLACE_WITH_PROBE_HTTP_GET_PATH: values.probeHttpGetPath,
          REPLACE_WITH_CONFIG_PATH: options.useAppFileName
            ? `configmaps/${name}/**`
            : "configmaps/**",
        },
      }),
    ),
  );
}
