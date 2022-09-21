import { Config } from "../../interfaces/config.interface.js";

export const applicationVersionPrompt = (config: Config) => {
  return {
    type: "input",
    name: "appVersion",
    message: "The version of application:",
    default: config.prompt.application.version,
  };
};
