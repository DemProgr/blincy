Get-ChildItem -Path "D:\startupsandideas\smallbusinesses\блинцы\paradise-on-one-page-main\node_modules\@tanstack\react-start" -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.Name -match "index\.html$|app\.html$|template" } | Select-Object -First 20 FullName | Out-File -FilePath "D:\startupsandideas\smallbusinesses\блинцы\paradise-on-one-page-main\template_results.txt"
Write-Host "Done"
