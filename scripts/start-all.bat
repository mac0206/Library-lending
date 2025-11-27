@echo off
echo 🚀 Starting all Lendify services...
echo.

@REM REM Copy .env files if they exist
@REM if exist ".env\MemberA.env" (
@REM     copy ".env\MemberA.env" "Member A\backend\.env" >nul
@REM     echo ✓ Copied MemberA.env to Member A/backend/.env
@REM )
@REM if exist ".env\MemberB.env" (
@REM     copy ".env\MemberB.env" "Member B\backend\.env" >nul
@REM     echo ✓ Copied MemberB.env to Member B/backend/.env
@REM )
@REM if exist ".env\MemberC.env" (
@REM     copy ".env\MemberC.env" "Member C\backend\.env" >nul
@REM     echo ✓ Copied MemberC.env to Member C/backend/.env
@REM )

echo.
echo Starting all services...
echo.

REM Start all services in new windows
start "Member A Backend" cmd /k "cd /d Member A\backend && npm start"
timeout /t 2 /nobreak >nul

start "Member B Backend" cmd /k "cd /d Member B\backend && npm start"
timeout /t 2 /nobreak >nul

start "Member C Backend" cmd /k "cd /d Member C\backend && npm start"
timeout /t 2 /nobreak >nul

start "Frontend" cmd /k "cd /d frontend && npm start"

echo.
echo ✅ All services are starting in separate windows...
echo 📝 Close the windows individually or press Ctrl+C to stop
echo.

