@echo off
REM ---------------------------------------------------------------
REM  Revacity CMS - start database and finish setup
REM  The app's database (Postgres) runs in Docker and was not running,
REM  which caused ECONNREFUSED. This starts it and makes sure the
REM  schema + starter data are in place. Double-click this file.
REM  (Docker Desktop must be running first.)
REM ---------------------------------------------------------------

cd /d "%~dp0"

echo.
echo === Starting database + redis (docker compose up -d) ===
echo.
docker compose up -d
if errorlevel 1 (
  echo.
  echo !! docker compose failed. Start Docker Desktop, then double-click this again.
  echo.
  pause
  exit /b 1
)

echo.
echo === Verifying database and setting up if needed ===
echo.
node fix-db-setup.cjs

echo.
pause
