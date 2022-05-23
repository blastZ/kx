export const serviceNodePortPrompt = {
  type: "input",
  name: "nodePort",
  message: "The node port of application:",
  validate(input: any) {
    if (
      !input ||
      Number.isNaN(Number(input)) ||
      !Number.isInteger(Number(input)) ||
      input < 30000 ||
      input > 32767
    ) {
      return "Invalid node port, it should between 30000-32767";
    }

    return true;
  },
  when: (answers: any) => {
    return answers.serviceType === "NodePort";
  },
};
