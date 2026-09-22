Get-NetTCPConnection -LocalPort 5173,5174,5175,5176,5177,5178 | Where-Object { $_.OwningProcess -ne $null } | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Write-Host "Done"
