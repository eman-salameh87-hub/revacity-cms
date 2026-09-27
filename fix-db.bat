@echo off
REM ---------------------------------------------------------------
REM  Revacity CMS - one-click database fix
REM  Root cause: the Postgres database (Docker container) was not
REM  running, so the app got ECONNREFUSED on localhost:5436.
REM  This starts the DB, applies the schema, and seeds it.
REM  Just double-click this file. (Docker Desktop must be running.)
REM ---------------------------------------------------------------

cd /d "%~dp0"

echo.
echo === Step 1/4: Starting database + redis (docker compose up -d) ===
echo.
docker compose up -d
if errorlevel 1 (
  echo.
  echo !! docker compose failed.
  echo    Make sure Docker Desktop is running, then double-click this again.
  echo.
  pause
  exit /b 1
)

echo.
echo Waiting for Postgres to accept connections...
set /a tries=0
:waitloop
docker exec revacity-cms-db pg_isready -U postgres -d revacity_cms >nul 2>&1
if not errorlevel 1 goto ready
set /a tries+=1
if %tries% geq 30 (
  echo !! Postgres did not become ready in time. Check "docker ps" and container logs.
  pause
  exit /b 1
)
timeout /t 2 /nobreak >nul
goto waitloop
:ready
echo Postgres is ready.

echo.
echo === Step 2/4: Applying schema (drizzle-kit push --force) ===
echo.
call npm run db:push
if errorlevel 1 (
  echo.
  echo !! db:push failed. Copy the red text above and send it to Claude.
  echo.
  pause
  exit /b 1
)

echo.
echo === Step 3/4: Seeding starter data (db:seed) ===
echo.
call npm run db:seed
if errorlevel 1 (
  echo.
  echo !! db:seed failed. Copy the red text above and send it to Claude.
  echo.
  pause
  exit /b 1
)

echo.
echo === Step 4/4: Done. Reload http://localhost:3000/en in your browser. ===
echo.
pause
