export interface Env {
  name: string;
  configMapKeyRef: {
    name: string;
    key: string;
  };
}

export interface Config {
  prompt: {
    namespaces: string[];
    application: {
      version: string;
      owner: string;
      replicaCount: number;
    };
  };
  envs: {
    [optionName: string]: Env[];
  };
}
