$projects = @(
  @{name="file-uploader"; path="d:\github\angular\file-uploader"},
  @{name="firebase"; path="d:\github\angular\firebase"},
  @{name="generic http service"; path="d:\github\angular\generic http service"},
  @{name="generic http service2"; path="d:\github\angular\generic http service2"},
  @{name="input-auto-complete"; path="d:\github\angular\input-auto-complete"},
  @{name="interceptor-data-header"; path="d:\github\angular\interceptor-data-header\frontend"},
  @{name="jquery-in-angular"; path="d:\github\angular\jquery-in-angular"},
  @{name="lifecycle-hooks"; path="d:\github\angular\lifecycle-hooks"},
  @{name="loader"; path="d:\github\angular\loader"},
  @{name="maps"; path="d:\github\angular\maps"},
  @{name="mat-dialog"; path="d:\github\angular\mat-dialog"},
  @{name="ng-model"; path="d:\github\angular\ng-model"},
  @{name="ngx-envconfig"; path="d:\github\angular\ngx-envconfig"},
  @{name="obeservable-and-all-operators"; path="d:\github\angular\obeservable-and-all-operators"},
  @{name="onInit"; path="d:\github\angular\onInit"},
  @{name="prime-ng"; path="d:\github\angular\prime-ng"},
  @{name="reactive-forms"; path="d:\github\angular\reactive-forms"},
  @{name="recaptcha"; path="d:\github\angular\recaptcha"},
  @{name="redux"; path="d:\github\angular\redux"},
  @{name="routing"; path="d:\github\angular\routing"}
)

$failed = @()
$passed = @()

foreach ($p in $projects) {
  Write-Host "`n=== Building: $($p.name) ===" -ForegroundColor Cyan
  Set-Location $p.path
  $output = ng build 2>&1
  $errorLines = $output | Where-Object { $_ -match "ERROR|error TS\d+" }
  if ($LASTEXITCODE -ne 0 -or $errorLines) {
    $failed += $p.name
    Write-Host "FAILED: $($p.name)" -ForegroundColor Red
    $output | Where-Object { $_ -match "ERROR|error TS\d+" } | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
  } else {
    $passed += $p.name
    Write-Host "OK: $($p.name)" -ForegroundColor Green
  }
}

Write-Host "`n========== RESULTS ==========" -ForegroundColor Magenta
Write-Host "PASSED ($($passed.Count)): $($passed -join ', ')" -ForegroundColor Green
Write-Host "FAILED ($($failed.Count)): $($failed -join ', ')" -ForegroundColor Red
