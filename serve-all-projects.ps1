# Serve All Angular Projects Script
# This script serves all working Angular projects on different ports

$ErrorActionPreference = "Continue"
$projectsDir = "d:\github\angular"
$startPort = 4200
$currentPort = $startPort

# Get all Angular project directories
$allDirs = Get-ChildItem -Path $projectsDir -Directory | 
    Where-Object { 
        $_.Name -ne "0.basics" -and 
        $_.Name -ne ".git" -and 
        (Test-Path (Join-Path $_.FullName "angular.json"))
    }

$jobs = @()

Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host "Starting All Angular Projects" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

foreach ($dir in $allDirs) {
    $projectName = $dir.Name
    $projectPath = $dir.FullName
    
    Write-Host "`nStarting: $projectName on port $currentPort" -ForegroundColor Yellow
    
    # Start ng serve as background job
    $job = Start-Job -ScriptBlock {
        param($path, $port, $name)
        Set-Location $path
        $output = ng serve --port $port 2>&1 | Out-String
        return @{
            Name = $name
            Port = $port
            Output = $output
            Success = $LASTEXITCODE -eq 0
        }
    } -ArgumentList $projectPath, $currentPort, $projectName
    
    $jobs += @{
        Job = $job
        Name = $projectName
        Port = $currentPort
        Path = $projectPath
    }
    
    $currentPort++
    
    # Brief pause to stagger starts
    Start-Sleep -Milliseconds 500
}

Write-Host "`n================================================================" -ForegroundColor Cyan
Write-Host "All Projects Started!" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan

# Display running projects
Write-Host "`nRunning Projects:" -ForegroundColor Green
foreach ($job in $jobs) {
    Write-Host "  • $($job.Name) - http://localhost:$($job.Port)" -ForegroundColor White
}

Write-Host "`nPress Ctrl+C to stop all servers..." -ForegroundColor Yellow
Write-Host "Monitoring project status...`n" -ForegroundColor Cyan

# Monitor jobs
try {
    while ($true) {
        foreach ($job in $jobs) {
            $state = $job.Job.State
            
            if ($state -eq "Failed" -or $state -eq "Completed") {
                $result = Receive-Job -Job $job.Job
                Write-Host "`n[$(Get-Date -Format 'HH:mm:ss')] $($job.Name) - Status: $state" -ForegroundColor $(if($state -eq "Failed"){"Red"}else{"Yellow"})
                
                if ($result.Output) {
                    $errors = $result.Output | Select-String -Pattern "ERROR|Error:" | Select-Object -First 3
                    if ($errors) {
                        $errors | ForEach-Object { Write-Host "  $_" -ForegroundColor Red }
                    }
                }
            }
        }
        
        Start-Sleep -Seconds 10
    }
}
finally {
    Write-Host "`n`nStopping all servers..." -ForegroundColor Yellow
    
    # Stop all jobs
    foreach ($job in $jobs) {
        Stop-Job -Job $job.Job -ErrorAction SilentlyContinue
        Remove-Job -Job $job.Job -ErrorAction SilentlyContinue
    }
    
    Write-Host "All servers stopped." -ForegroundColor Green
}
