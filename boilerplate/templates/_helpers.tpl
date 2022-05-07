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

{{- define "commonEnv.mysql" }}
- name: MYSQL_USERNAME
  valueFrom:
    configMapKeyRef:
      name: mysql
      key: username
- name: MYSQL_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: mysql
      key: password
- name: MYSQL_HOST
  valueFrom:
    configMapKeyRef:
      name: mysql
      key: host
- name: MYSQL_PORT
  valueFrom:
    configMapKeyRef:
      name: mysql
      key: port
{{- end }}