@echo off
set "SESSION=%~dp0session.sv"
where sonic-visualiser.exe >nul 2>nul && (start "" sonic-visualiser.exe "%SESSION%" & exit /b 0)
if exist "%ProgramFiles%\Sonic Visualiser\Sonic Visualiser.exe" (start "" "%ProgramFiles%\Sonic Visualiser\Sonic Visualiser.exe" "%SESSION%" & exit /b 0)
if exist "%ProgramFiles(x86)%\Sonic Visualiser\Sonic Visualiser.exe" (start "" "%ProgramFiles(x86)%\Sonic Visualiser\Sonic Visualiser.exe" "%SESSION%" & exit /b 0)
echo Sonic Visualiser was not found on PATH or under Program Files.
pause
