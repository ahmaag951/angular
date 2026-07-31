$projects = @(
  @{name="file-uploader"; path="d:\github\angular\file-uploader"},
  @{name="firebase"; path="d:\github\angular\firebase"},
  @{name="generic http service"; path="d:\github\angular\generic http service"},
  @{name="generic http service2"; path="d:\github\angular\generic http service2"},
  @{name="input-auto-complete"; path="d:\github\angular\input-auto-complete"},
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
$passed = @()
$failed = @()
foreach ($p in $projects) {
  Set-Location $p.path
  $out = ng build 2>&1
  if ($LASTEXITCODE -eq 0) {
    $passed += $p.name
    Write-Host "OK: $($p.name)" -ForegroundColor Green
  } else {
    $failed += $p.name
    Write-Host "FAIL: $($p.name)" -ForegroundColor Red
    $out | Where-Object { $_ -match "ERROR" } | Select-Object -First 2 | ForEach-Object { Write-Host "  $_" -ForegroundColor Yellow }
  }
}
Write-Host ""
Write-Host "PASSED ($($passed.Count)): $($passed -join ', ')" -ForegroundColor Green
Write-Host "FAILED ($($failed.Count)): $($failed -join ', ')" -ForegroundColor Red
