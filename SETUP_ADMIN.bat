@echo off
:: SETUP_ADMIN.bat — Eseguire come AMMINISTRATORE (tasto destro -> Esegui come amministratore)
:: Configura PC fisso: 24/7 + RDP + SSH
echo ============================================
echo  TITANIUM_OS — Setup Admin PC fisso
echo ============================================

echo.
echo [1/4] Mai sospensione/ibernazione (24/7)...
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
powercfg /change monitor-timeout-ac 10
powercfg /hibernate off
echo OK.

echo.
echo [2/4] Piano prestazioni massime...
powercfg /setactive 8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c
echo OK.

echo.
echo [3/4] Abilita Desktop Remoto (RDP)...
Set-ItemProperty "HKLM:\System\CurrentControlSet\Control\Terminal Server" fDenyTSConnections 0 2>nul
netsh advfirewall firewall set rule group="Desktop remoto" new enable=Yes
echo OK.

echo.
echo [4/4] Installa e avvia OpenSSH Server...
powershell -Command "Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0"
net start sshd
sc config sshd start=auto
echo OK.

echo.
echo ============================================
echo  FATTO. Riavvia il PC per applicare tutto.
echo ============================================
pause
