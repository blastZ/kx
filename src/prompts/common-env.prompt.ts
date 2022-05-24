export const commonEnvPrompt = {
  type: "checkbox",
  name: "commonEnv",
  message: "Check used environments by application:",
  choices: ["mysql", "postgres", "redis", "amqp", "sls", "oss", "ding-alert"],
};
