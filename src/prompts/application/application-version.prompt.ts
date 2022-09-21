import { getCliConfig } from "../../utils/get-cli-config.util.js";

export const applicationVersionPrompt = {
  type: "input",
  name: "appVersion",
  message: "The version of application:",
  default: (await getCliConfig()).prompt.application.version,
};
