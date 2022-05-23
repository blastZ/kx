export const replicaCountPrompt = {
  type: "input",
  name: "replicaCount",
  message: "The replica count of application:",
  default: "1",
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
