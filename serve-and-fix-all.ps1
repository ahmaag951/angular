# Script to serve all Angular projects (except 0.basics) and track errors
$projectsDir = "d:\github\angular"
$logFile = "$projectsDir\serve-all-log.txt"
$errorSummaryFile = "$projectsDir\error-summary.txt"

# Get all directories except 0.basics
$allDirs = Get-ChildItem -Path $projectsDir -Directory | 
    Where-Object { $_.Name -ne "0.basics" -and $_.Name -ne ".git" }

# Initialize log files
"Starting project serve test at $(Get-Date)" | Set-Content $logFile
"Error Summary for All Projects" | Set-Content $errorSummaryFile
"=" * 80 | Add-Content $errorSummaryFile

$successProjects = @()
$failedProjects = @()

foreach ($dir in $allDirs) {
    $projectName = $dir.Name
    $projectPath = $dir.FullName
    
    Write-Host "===============================================" -ForegroundColor Cyan
    Write-Host "Testing: $projectName" -ForegroundColor Cyan
    Write-Host "===============================================" -ForegroundColor Cyan
    
    # Check if it's an Angular project
    $angularJsonPath = Join-Path $projectPath "angular.json"
    
    if (!(Test-Path $angularJsonPath)) {
        Write-Host "Skipping $projectName - not an Angular project" -ForegroundColor Yellow
        "Skipped: $projectName - not an Angular project" | Add-Content $logFile
        continue
    }
    
    # Navigate to project directory
    Push-Location $projectPath
    
    try {
        Write-Host "Building $projectName..." -ForegroundColor Yellow
        
        # Try to build the project (faster than serve)
        $buildOutput = ng build 2>&1 | Out-String
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ $projectName built successfully!" -ForegroundColor Green
            $successProjects += $projectName
            "$projectName - SUCCESS" | Add-Content $logFile
            "" | Add-Content $errorSummaryFile
            "PROJECT: $projectName - ✓ SUCCESS" | Add-Content $errorSummaryFile
            "-" * 80 | Add-Content $errorSummaryFile
        } else {
            Write-Host "✗ $projectName failed to build" -ForegroundColor Red
            $failedProjects += $projectName
            "$projectName - FAILED" | Add-Content $logFile
            $buildOutput | Add-Content $logFile
            "" | Add-Content $errorSummaryFile
            "PROJECT: $projectName - ✗ FAILED" | Add-Content $errorSummaryFile
            "-" * 80 | Add-Content $errorSummaryFile
            
            # Extract and log errors
            $errors = $buildOutput | Select-String -Pattern "\[ERROR\]|\[error\]|Error:" -Context 0,2
            if ($errors) {
                $errors | ForEach-Object { $_.Line } | Add-Content $errorSummaryFile
            } else {
                $buildOutput | Add-Content $errorSummaryFile
            }
            "=" * 80 | Add-Content $errorSummaryFile
        }
    }
    catch {
        Write-Host "Exception occurred: $_" -ForegroundColor Red
        "$projectName - EXCEPTION: $_" | Add-Content $logFile
        $failedProjects += $projectName
    }
    finally {
        Pop-Location
    }
    
    Write-Host ""
}

# Summary
Write-Host "`n===============================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host "Total projects tested: $($successProjects.Count + $failedProjects.Count)" -ForegroundColor White
Write-Host "Successful: $($successProjects.Count)" -ForegroundColor Green
Write-Host "Failed: $($failedProjects.Count)" -ForegroundColor Red

if ($successProjects.Count -gt 0) {
    Write-Host "`nSuccessful projects:" -ForegroundColor Green
    $successProjects | ForEach-Object { Write-Host "  ✓ $_" -ForegroundColor Green }
}

if ($failedProjects.Count -gt 0) {
    Write-Host "`nFailed projects:" -ForegroundColor Red
    $failedProjects | ForEach-Object { Write-Host "  ✗ $_" -ForegroundColor Red }
}

Write-Host "`nDetailed errors saved to: $errorSummaryFile" -ForegroundColor Yellow
Write-Host "Full log saved to: $logFile" -ForegroundColor Yellow
