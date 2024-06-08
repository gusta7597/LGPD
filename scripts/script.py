import re
import requests

notification_endpoint_url = 'http://localhost:3000/auth/sendSecurityEmail'

log_file_path = '/var/lib/postgresql/15/main/pg_log/postgresql.log'


def send_email():
    try:
        headers = {
            'Authorization': '123456'
        }
        response = requests.get(notification_endpoint_url, headers=headers)
        response.raise_for_status()
        print(f"Notificação enviada com sucesso: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao enviar a notificação: {e}")


def logs_verify():
    with open(log_file_path, 'r') as file:
        logs = file.readlines()

    alerts = []

    patterns = {
        'falha_autenticacao': re.compile(r'FATAL:  password authentication failed for user'),
        'login_sucesso': re.compile(r'LOG:  connection authorized: user=\S+ database=\S+ application=\S+ client=\S+'),
        'alteracao_privilegios': re.compile(r'LOG:  statement: GRANT|REVOKE'),
        'criacao_usuario': re.compile(r'LOG:  statement: CREATE USER|ALTER USER|DROP USER'),
        'alteracao_estrutura': re.compile(r'LOG:  statement: CREATE TABLE|ALTER TABLE|DROP TABLE|CREATE DATABASE|ALTER DATABASE|DROP DATABASE'),
        'manipulacao_dados': re.compile(r'LOG:  statement: SELECT|INSERT|UPDATE|DELETE'),
        'comando_perigoso': re.compile(r'LOG:  statement: COPY'),
        'tentativa_apagar_dados': re.compile(r'LOG:  statement: TRUNCATE|DELETE FROM \S+;$'),
        'desligamento_reinicializacao': re.compile(r'LOG:  received immediate shutdown request|LOG:  database system is shut down')
    }

    for log in logs:
        for atividade, pattern in patterns.items():
            if pattern.search(log):
                alerts.append(log)

    if alerts:
        send_email()
        # pass


if __name__ == "__main__":
    logs_verify()
