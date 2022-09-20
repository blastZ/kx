import { getCliConfig } from "../utils/get-cli-config.util.js";

export const namespacePrompt = {
  type: "list",
  name: "namespace",
  message: "The namespace of application:",
  choices: (await getCliConfig()).prompt.namespaces,
};
