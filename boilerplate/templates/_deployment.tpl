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
  replicas: {{ .Values.canaryDeployment.replicaCount | default 1 }}
  {{- else }}
  replicas: {{ .Values.replicaCount }}
  {{- end }}
{{- end }}