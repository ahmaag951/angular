# Run Angular projects from 09 onwards on different ports

$basicsFolder = "d:\github\angular\0.basics"
$startPort = 4200

# Get all Angular projects starting from 09
$allProjects = Get-ChildItem -Path $basicsFolder -Directory | Where-Object {
    Test-Path (Join-Path $_.FullName "angular.json")
} | Sort-Object Name

# Filter projects from 09 onwards
$projects = $allProjects | Where-Object { 
    $_.Name -match '^0*9\.' -or 
    $_.Name -match '^1\d\.' -or 
    $_.Name -match '^2\d\.'
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Angular Projects (09 onwards)" -ForegroundColor Cyan
Write-Host "Found $($projects.Count) projects" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$runningProjects = @()
$currentPort = $startPort

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
    
    Start-Sleep -Seconds 2
    $currentPort++
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "All Projects Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$runningProjects | Format-Table -Property Name, Port, URL -AutoSize

Write-Host ""
Write-Host "Commands:" -ForegroundColor Yellow
Write-Host "  - View jobs: Get-Job" -ForegroundColor Gray
Write-Host "  - Stop all: Get-Job | Stop-Job; Get-Job | Remove-Job" -ForegroundColor Gray
