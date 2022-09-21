import fs from "fs/promises";
import path from "path";
import { $ } from "zx";

import { BOILERPLATE_PATH, WSP_PATH } from "../constants/path.constant.js";
import { Env } from "../interfaces/config.interface.js";
import { getCliConfig } from "../utils/get-cli-config.util.js";

export class TemplateHelper {
  private appPath: string;

  constructor(appName: string) {
    this.appPath = path.resolve(WSP_PATH, `./${appName}`);
  }

  public async generateTemplates() {
    await $`rm -rf ${path.resolve(this.appPath, "./templates")}`.quiet();

    await this.copyTemplates();
    await this.generateCommonEnvTemplate();
  }

  private async copyTemplates() {
    await $`cp -r ${path.resolve(
      BOILERPLATE_PATH,
      "./templates",
    )} ${path.resolve(this.appPath, `./templates`)}`.quiet();
  }

  private async generateCommonEnvTemplate() {
    const envsMap = (await getCliConfig()).envs;
    const optinoNames = Object.keys(envsMap);

    const templateStrings = optinoNames.map((optionName) => {
      const envs = envsMap[optionName];

      return this.getTemplateString(optionName, envs);
    });

    const templateResultString = templateStrings.join("\n\n");

    await fs.writeFile(
      path.resolve(this.appPath, "./templates/_envs.tpl"),
      templateResultString,
    );
  }

  private getTemplateString(optionName: string, envs: Env[]) {
    let templateString = `{{- define "commonEnv.${optionName}" }}\n`;

    envs.map((env) => {
      templateString = templateString.concat(`- name: ${env.name}
  valueFrom:
    configMapKeyRef:
      name: ${env.configMapKeyRef.name}
      key: ${env.configMapKeyRef.key}
`);
    });

    templateString = templateString.concat(`{{- end }}`);

    return templateString;
  }
}
