import { Config } from "../interfaces/config.interface.js";

export const replicaCountPrompt = (config: Config) => {
  return {
    type: "input",
    name: "replicaCount",
    message: "The replica count of application:",
    default: config.prompt.application.replicaCount,
    validate(input: any) {
      if (
        !input ||
        Number.isNaN(Number(input)) ||
        !Number.isInteger(Number(input)) ||
        input < 1 ||
        input > 8
      ) {
        return "Invalid replica count, it should between 1-8";
      }

      return true;
    },
  };
};
