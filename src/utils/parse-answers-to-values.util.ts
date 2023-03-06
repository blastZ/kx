import { Values } from "../interfaces/values.interface";

export function parseAnswersToValues(answers: any) {
  const values: Values = {
    namespace: answers.namespace,
    appVersion: answers.appVersion,
    serviceType: answers.serviceType,
    servicePort: String(Number(answers.servicePort)),
    nodePort: String(Number(answers.nodePort)),
    commonEnv: answers.commonEnv,
    owner: answers.owner,
    replicaCount: String(Number(answers.replicaCount)),
    probeHttpGetPath: answers.probeHttpGetPath,
    configVersion: answers.configVersion,
    configMountPath: answers.configMountPath,
  };

  return values;
}
