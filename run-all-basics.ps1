# Script to run all Angular projects in 0.basics folder on different ports
# Each project will run in background on sequential ports starting from 4200

$ErrorActionPreference = "Continue"
$basicsFolder = "d:\github\angular\0.basics"
$startPort = 4200
$currentPort = $startPort

# Get all Angular projects
$projects = Get-ChildItem -Path $basicsFolder -Directory | Where-Object {
    Test-Path (Join-Path $_.FullName "angular.json")
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting All Angular Projects" -ForegroundColor Cyan
Write-Host "Base Folder: $basicsFolder" -ForegroundColor Cyan
Write-Host "Found $($projects.Count) projects" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$runningProjects = @()

foreach ($project in $projects) {
    $projectPath = $project.FullName
    $projectName = $project.Name
    
    Write-Host "[$currentPort] Starting: $projectName" -ForegroundColor Yellow
    
    # Start ng serve in background on specific port
    $job = Start-Job -ScriptBlock {
        param($path, $port)
        Set-Location $path
        ng serve --port $port 2>&1
    } -ArgumentList $projectPath, $currentPort
    
    $runningProjects += [PSCustomObject]@{
        Name = $projectName
        Port = $currentPort
        JobId = $job.Id
        URL = "http://localhost:$currentPort"
    }
    
    # Wait a bit to stagger the starts
    Start-Sleep -Seconds 2
    
    $currentPort++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "All Projects Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Display running projects
Write-Host "Running Projects:" -ForegroundColor Cyan
Write-Host ""
$runningProjects | Format-Table -Property Name, Port, URL -AutoSize

Write-Host ""
Write-Host "Commands:" -ForegroundColor Yellow
Write-Host "  - To view job status: Get-Job" -ForegroundColor Gray
Write-Host "  - To view output: Receive-Job -Id <JobId> -Keep" -ForegroundColor Gray
Write-Host "  - To stop all: Get-Job | Stop-Job; Get-Job | Remove-Job" -ForegroundColor Gray
Write-Host "  - To stop specific: Stop-Job -Id <JobId>; Remove-Job -Id <JobId>" -ForegroundColor Gray
Write-Host ""
