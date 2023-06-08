{{- define "kx.replicas" }}
{{- if not (kindIs "invalid" .replicaCount) }}
replicas: {{ .replicaCount }}
{{- else }}
replicas: 1
{{- end }}
{{- end }}