import { Config } from "../../interfaces/config.interface.js";

export const configMountPathPrompt = (config: Config) => {
  return {
    type: "input",
    name: "configMountPath",
    message: "The mount path of config file:",
    default: config.prompt.config.mountPath,
  };
};
