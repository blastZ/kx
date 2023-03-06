export interface Values {
  namespace: string;
  appVersion: string;
  serviceType: string;
  servicePort: string;
  commonEnv?: string[];
  owner: string;
  replicaCount: string;
  nodePort?: string;
  probeHttpGetPath: string;
  configVersion: string;
  configMountPath: string;
}
