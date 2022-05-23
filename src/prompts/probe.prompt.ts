import { DistinctQuestion } from "inquirer";

export const probePrompt: DistinctQuestion = {
  type: "input",
  name: "probeHttpGetPath",
  message: "The http get path of probe:",
  default: "/",
};
