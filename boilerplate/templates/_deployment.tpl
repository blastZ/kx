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
    spec:
      containers:
        - name: {{ $appName }}
          {{- with .Values.image }}
          {{- if $.isCanary }}
          image: {{ printf "%s:%s" .repo .canaryTag }}
          {{- else }}
          image: {{ printf "%s:%s" .repo .tag }}
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
            {{- if has "mysql" .Values.commonEnv }}
              {{- include "commonEnv.mysql" . | indent 12 }}
            {{- end }}
            {{- if has "postgres" .Values.commonEnv }}
              {{- include "commonEnv.postgres" . | indent 12 }}
            {{- end }}
            {{- if has "redis" .Values.commonEnv }}
              {{- include "commonEnv.redis" . | indent 12 }}
            {{- end }}
            {{- if has "amqp" .Values.commonEnv }}
              {{- include "commonEnv.amqp" . | indent 12 }}
            {{- end }}
          {{- end }}
          startupProbe:
            {{- toYaml .Values.startupProbe | nindent 12 }}
          livenessProbe:
            {{- toYaml .Values.livenessProbe | nindent 12 }}
      {{- if .Values.image.pullSecret }}
      imagePullSecrets:
        - name: {{ .Values.image.pullSecret }}
      {{- end }}
      volumes:
        {{- range $i, $v := .Values.config.mounts }}
        - name: {{ $v.name }}
          configMap:
            {{- if and $.isCanary $.Values.config.canaryPath }}
            name: {{ printf "%s-canary-config-%s" $appName $.Values.config.canaryVersion }}
            {{- else }}
            name: {{ printf "%s-config-%s" $appName $.Values.config.version }}
            {{- end }}
            items: {{ $v.items | toYaml | nindent 14 }}
        {{- end }}
  selector:
    matchLabels:
      app: {{ $appName }}
  replicas: {{ .Values.replicaCount }}
{{- end }}