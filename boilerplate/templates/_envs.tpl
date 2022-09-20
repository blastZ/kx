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

{{- define "commonEnv.sls" }}
- name: SLS_KEY
  valueFrom:
    configMapKeyRef:
      name: sls
      key: accessKeyId
- name: SLS_SECRET
  valueFrom:
    configMapKeyRef:
      name: sls
      key: accessKeySecret
{{- end }}

{{- define "commonEnv.amqp" }}
- name: AMQP_USERNAME
  valueFrom:
    configMapKeyRef:
      name: amqp
      key: username
- name: AMQP_PASSWORD
  valueFrom:
    configMapKeyRef:
      name: amqp
      key: password
- name: AMQP_HOST
  valueFrom:
    configMapKeyRef:
      name: amqp
      key: host
- name: AMQP_PORT
  valueFrom:
    configMapKeyRef:
      name: amqp
      key: port
{{- end }}

{{- define "commonEnv.oss" }}
- name: OSS_ACCESS_KEY_ID
  valueFrom:
    configMapKeyRef:
      name: oss
      key: accessKeyId
- name: OSS_ACCESS_KEY_SECRET
  valueFrom:
    configMapKeyRef:
      name: oss
      key: accessKeySecret
{{- end }}

{{- define "commonEnv.dingAlert" }}
- name: DING_ALERT_BASE_URL
  valueFrom:
    configMapKeyRef:
      name: dingding-alert
      key: baseUrl
- name: DING_ALERT_SECRET
  valueFrom:
    configMapKeyRef:
      name: dingding-alert
      key: secret
{{- end }}