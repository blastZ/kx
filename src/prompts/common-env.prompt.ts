import { getCliConfig } from "../utils/get-cli-config.util.js";

export const commonEnvPrompt = async () => {
  const options = Object.keys((await getCliConfig()).envs);

  return {
    type: "checkbox",
    name: "commonEnv",
    message: "Check used environments by application:",
    choices: options,
    when: options.length > 0,
  };
};
