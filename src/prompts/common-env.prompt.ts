import { Config } from "../interfaces/config.interface.js";

export const commonEnvPrompt = (config: Config) => {
  const options = Object.keys(config.envs);

  return {
    type: "checkbox",
    name: "commonEnv",
    message: "Check used environments by application:",
    choices: options,
    when: options.length > 0,
  };
};
