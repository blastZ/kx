# kx

Kubernetes application generator.

## Installation

```bash
npm install -g @blastz/kx
```

## Usage

### Create new workspace(chart)

```bash
kx create [workspace-name]
```

### Update sdk(templates)

```bash
kx update .
```

### Create new app(values yaml file)

```bash
kx g values [app-name]
```

## Canary deployment

Canary deployment depend on [istio](https://istio.io/latest/), check your
kubernetes environment before use this feature.

### Basic traffic routing based on header

Add below config into your values file

```yaml
canaryDeployment:
  enable: true
  token:
    key: canary-token
    value: abc123
  image:
    tag: 20220923-6a11d0f
```

This will create **Canary Deployment**, **VirtualService** and **DestinationRule**, when
the request with header `canary-token` and the value is `abc123` the traffic will route
to the **canary** pod otherwise it will goto **stable** pod.

### Use ingress gateway

Add below config into values file

```yaml
gateway:
  hosts:
    - "*.yourdomain.com"
```

### Full configuration list

```ts
interface Config {
  canaryDeployment?: {
    enable: boolean;
    token: {
      key: string;
      value: string;
    };
    image: {
      tag: string;
    };
    config?: {
      path: string;
      version: string;
    };
  };
}
```
