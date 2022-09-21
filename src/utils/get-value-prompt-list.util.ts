import {
  applicationOwnerPrompt,
  applicationVersionPrompt,
} from "../prompts/application/index.js";
import { commonEnvPrompt } from "../prompts/common-env.prompt.js";
import { namespacePrompt } from "../prompts/namespace.prompt.js";
import { probePrompt } from "../prompts/probe.prompt.js";
import { replicaCountPrompt } from "../prompts/replica-count.prompt.js";
import {
  serviceNodePortPrompt,
  servicePortPrompt,
  serviceTypePrompt,
} from "../prompts/service/index.js";
import { getCliConfig } from "./get-cli-config.util.js";

export async function getValuePromptList() {
  const config = await getCliConfig();

  return [
    namespacePrompt(config),
    applicationVersionPrompt(config),
    applicationOwnerPrompt(config),
    replicaCountPrompt(config),
    commonEnvPrompt(config),
    serviceTypePrompt,
    servicePortPrompt,
    serviceNodePortPrompt,
    probePrompt,
  ];
}
