import { getCliConfig } from "../../utils/get-cli-config.util.js";

export const applicationOwnerPrompt = {
  type: "input",
  name: "owner",
  message: "The owner of application:",
  default: (await getCliConfig()).prompt.application.owner,
};
