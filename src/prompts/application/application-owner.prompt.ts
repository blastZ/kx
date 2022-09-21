import { Config } from "../../interfaces/config.interface.js";

export const applicationOwnerPrompt = (config: Config) => {
  return {
    type: "input",
    name: "owner",
    message: "The owner of application:",
    default: config.prompt.application.owner,
  };
};
