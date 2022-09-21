import fs from "fs/promises";
import { resolve } from "path";

import { Env } from "../interfaces/config.interface.js";
import { getCliConfig } from "./get-cli-config.util.js";

function getTemplateString(optionName: string, envs: Env[]) {
  let templateString = `{{- define "commonEnv.${optionName}" }}\n`;

  envs.map((env) => {
    templateString = templateString.concat(`  - name: ${env.name}
    valueFrom:
      configMapKeyRef:
        name: ${env.configMapKeyRef.name}
        key: ${env.configMapKeyRef.key}
`);
  });

  templateString = templateString.concat(`{{- end }}`);

  return templateString;
}

export async function generateCommonEnvTemplate(appPath: string) {
  const envsMap = (await getCliConfig()).envs;
  const optinoNames = Object.keys(envsMap);

  const templateStrings = optinoNames.map((optionName) => {
    const envs = envsMap[optionName];

    return getTemplateString(optionName, envs);
  });

  const templateResultString = templateStrings.join("\n\n");

  await fs.writeFile(
    resolve(appPath, "./templates/_envs.tpl"),
    templateResultString,
  );
}
