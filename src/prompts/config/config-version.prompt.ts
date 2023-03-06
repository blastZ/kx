import { Config } from "../../interfaces/config.interface.js";

export const configVersionPrompt = (config: Config) => {
  return {
    type: "input",
    name: "configVersion",
    message: "The version of config file:",
    default: config.prompt.config.version,
  };
};
