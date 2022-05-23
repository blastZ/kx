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

export function getValuePromptList() {
  return [
    namespacePrompt,
    applicationVersionPrompt,
    applicationOwnerPrompt,
    replicaCountPrompt,
    commonEnvPrompt,
    serviceTypePrompt,
    servicePortPrompt,
    serviceNodePortPrompt,
    probePrompt,
  ];
}
