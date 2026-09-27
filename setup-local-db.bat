@echo off
REM ---------------------------------------------------------------
REM  Revacity CMS - set up the database on your existing PostgreSQL
REM  (no Docker needed). This creates the app's database on your local
REM  PostgreSQL server (localhost:5432), points the app at it, and
REM  loads the schema + starter data. Double-click this file.
REM
REM  You'll be asked for your PostgreSQL password. It is typed here on
REM  your own machine and only written into this project's .env file.
REM ---------------------------------------------------------------

cd /d "%~dp0"

echo.
echo This will set up the app database on your local PostgreSQL (localhost:5432, user "postgres").
echo.
set /p PGPASS=Enter your PostgreSQL password for user "postgres":

node setup-local-db.cjs

echo.
pause
