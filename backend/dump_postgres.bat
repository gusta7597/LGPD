@echo off
setlocal enabledelayedexpansion

if not exist .env (
    echo .env file not found!
    exit /b 1
)

for /f "tokens=1,2 delims==" %%i in (.env) do (
    set %%i=%%j
)

set "HOST=%POSTGRES_HOST%"
set "PORT=%DB_PORT%"
set "USER=%POSTGRES_USER%"
set "DBNAME=%POSTGRES_DATABASE%"
set "BACKUP_DIR=%BACKUP_DIR%"
set "PASSWORD=%POSTGRES_PASSWORD%"
for /f "tokens=2 delims==" %%i in ('wmic OS get localdatetime /value') do set "TIMESTAMP=%%i"
set "TIMESTAMP=%TIMESTAMP:~0,4%%TIMESTAMP:~4,2%%TIMESTAMP:~6,2%%TIMESTAMP:~8,2%%TIMESTAMP:~10,2%%TIMESTAMP:~12,2%"
set "BACKUP_FILE=%BACKUP_DIR%\%DBNAME%-%TIMESTAMP%.sql"

if not exist "%BACKUP_DIR%" (
    mkdir "%BACKUP_DIR%"
)

set PGPASSWORD=%PASSWORD%
pg_dump -h %HOST% -p %PORT% -U %USER% -F c -b -v -f "%BACKUP_FILE%" %DBNAME%

if %ERRORLEVEL% equ 0 (
    echo Backup realizado com sucesso: %BACKUP_FILE%
) else (
    echo Erro ao realizar o backup do banco de dados
)

endlocal
pause
