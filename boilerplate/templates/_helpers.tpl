{{- define "commonEnv.redis" }}
- name: REDIS_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: redis
      key: password
- name: REDIS_HOST
  valueFrom:
    configMapKeyRef:
      name: redis
      key: host
- name: REDIS_PORT
  valueFrom:
    configMapKeyRef:
      name: redis
      key: port
{{- end }}

{{- define "commonEnv.postgres" }}
- name: POSTGRES_USERNAME
  valueFrom:
    configMapKeyRef:
      name: postgres
      key: username
- name: POSTGRES_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: postgres
      key: password
- name: POSTGRES_HOST
  valueFrom:
    configMapKeyRef:
      name: postgres
      key: host
- name: POSTGRES_PORT
  valueFrom:
    configMapKeyRef:
      name: postgres
      key: port
{{- end }}