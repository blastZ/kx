import { Config } from "../interfaces/config.interface.js";

export const namespacePrompt = (config: Config) => {
  return {
    type: "list",
    name: "namespace",
    message: "The namespace of application:",
    choices: config.prompt.namespaces,
  };
};
