@echo off
setlocal

cd /d "%~dp0"

echo Gerando miniaturas das capas locais...
echo.

powershell -ExecutionPolicy Bypass -File ".\scripts\build-cover-thumbs.ps1"
set "EXIT_CODE=%ERRORLEVEL%"

echo.
if not "%EXIT_CODE%"=="0" (
  echo Falha ao gerar as miniaturas.
  pause
  exit /b %EXIT_CODE%
)

echo Miniaturas geradas com sucesso.
pause
