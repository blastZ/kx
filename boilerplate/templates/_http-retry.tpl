{{- define "kx.httpRetry" }}
{{- with (.Values.httpRetry) }}
retries:
  attempts: {{ .count | default 2 }}
  {{- if .timeout }}
  perTryTimeout: {{ .timeout }}
  {{- end }}
  {{- if .when }}
  retryOn: {{ .when }}
  {{- end }}
{{- end }}
{{- end }}