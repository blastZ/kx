{{- define "kx.deployment" }}
{{- $appName := .Values.appName -}}
apiVersion: apps/v1
kind: Deployment
metadata:
  namespace: {{ .Values.namespace }}
  {{- if .isCanary }}
  name: {{ printf "%s-canary" $appName }}
  {{- else }}
  name: {{ $appName }}
  {{- end }}
  labels:
    app: {{ $appName }}
    {{- toYaml .Values.labels | nindent 4 }}
  annotations:
    {{- toYaml .Values.annotations | nindent 4 }}
spec:
  template:
    metadata:
      name: {{ $appName }}
      labels:
        app: {{ $appName }}
        {{- if .isCanary }}
        version: canary
        {{- else }}
        version: stable
        {{- end }}
        {{- if (.Values.pod).labels }}
        {{- toYaml .Values.pod.labels | nindent 8 }}
        {{- end }}
      {{- if (.Values.pod).annotations }}
      annotations:
        {{- toYaml .Values.pod.annotations | nindent 8 }}
      {{- end }}
    spec:
      {{- if .Values.hostAliases }}
      hostAliases:
        {{- toYaml .Values.hostAliases | nindent 8 }}
      {{- end }}
      containers:
        - name: {{ $appName }}
          {{- with .Values.image }}
          {{- if $.isCanary }}
          {{- if .registry }}
          image: {{ printf "%s/%s:%s" .registry .repo $.Values.canaryDeployment.image.tag }}
          {{- else }}
          image: {{ printf "%s:%s" .repo $.Values.canaryDeployment.image.tag }}
          {{- end }}
          {{- else }}
          {{- if .registry }}
          image: {{ printf "%s/%s:%s" .registry .repo .tag }}
          {{- else }}
          image: {{ printf "%s:%s" .repo .tag }}
          {{- end }}
          {{- end }}
          {{- end }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
          volumeMounts:
            {{- range $i, $v := .Values.config.mounts }}
            {{- $mount := omit $v "name" "items" }}
            - name: {{ $v.name }}
            {{- $mount | toYaml | nindent 14 }}
            {{- end }}
          {{- if .Values.commonEnv }}
          env:
            {{- range $i, $v := .Values.commonEnv }}
            {{- include (printf "commonEnv.%s" $v) . | indent 12 }}
            {{- end }}
          {{- end }}
          startupProbe:
            {{- toYaml .Values.startupProbe | nindent 12 }}
          livenessProbe:
            {{- toYaml .Values.livenessProbe | nindent 12 }}
          readinessProbe:
            {{- toYaml .Values.readinessProbe | nindent 12 }}
      {{- if .Values.image.pullSecret }}
      imagePullSecrets:
        - name: {{ .Values.image.pullSecret }}
      {{- end }}
      volumes:
        {{- range $i, $v := .Values.config.mounts }}
        - name: {{ $v.name }}
          configMap:
            {{- if and $.isCanary (($.Values.canaryDeployment).config).path (($.Values.canaryDeployment).config).version }}
            name: {{ printf "%s-canary-config-%s" $appName $.Values.canaryDeployment.config.version }}
            {{- else }}
            name: {{ printf "%s-config-%s" $appName $.Values.config.version }}
            {{- end }}
            items: {{ $v.items | toYaml | nindent 14 }}
        {{- end }}
  selector:
    matchLabels:
      app: {{ $appName }}
  {{- if .isCanary }}
  {{- include "kx.replicas" (dict "replicaCount" .Values.canaryDeployment.replicaCount) | indent 2 }}
  {{- else }}
  {{- include "kx.replicas" (dict "replicaCount" .Values.replicaCount) | indent 2 }}
  {{- end }}
{{- end }}