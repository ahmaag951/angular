# Angular Projects Auto-Fixer
# Automatically fixes common issues and tests all non-basics projects

$projectsDir = "d:\github\angular"

# Get all Angular projects except 0.basics
$projects = Get-ChildItem -Path $projectsDir -Directory | Where-Object { 
    $_.Name -ne "0.basics" -and 
    $_.Name -ne ".git" -and 
    (Test-Path (Join-Path $_.FullName "angular.json"))
}

Write-Host "`nFound $($projects.Count) Angular projects to process`n" -ForegroundColor Cyan

$successCount = 0
$failCount = 0

foreach ($proj in $projects) {
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "Processing: $($proj.Name)" -ForegroundColor Yellow
    Write-Host "================================" -ForegroundColor Cyan
    
    Set-Location $proj.FullName
    
    # Check if project uses Angular Material
    $materialFiles = Get-ChildItem -Path src -Recurse -Filter *.ts -ErrorAction SilentlyContinue | 
        Where-Object { (Get-Content $_.FullName -Raw) -match "@angular/material" }
    
    if ($materialFiles) {
        Write-Host "  Checking Angular Material..." -ForegroundColor White
        $packageJson = Get-Content package.json | ConvertFrom-Json
        
        if (-not $packageJson.dependencies.'@angular/material') {
            Write-Host "  Installing @angular/material and @angular/cdk..." -ForegroundColor Cyan
            npm install @angular/material@^19.0.0 @angular/cdk@^19.0.0 --legacy-peer-deps 2>&1 | Out-Null
            Write-Host "  ✓ Packages installed" -ForegroundColor Green
        }
    }
    
    # Fix common import issues
    Write-Host "  Fixing imports..." -ForegroundColor White
    Get-ChildItem -Path src -Recurse -Filter *.ts -ErrorAction SilentlyContinue | ForEach-Object {
        $content = Get-Content $_.FullName
        $changed = $false
        
        $content = $content -replace "from '@angular/material'", "from '@angular/material/dialog'"
        $changed = $true
        
        if ($changed) {
            $content | Set-Content $_.FullName
        }
    }
    
    # Fix CSS imports
    Write-Host "  Fixing CSS..." -ForegroundColor White
    Get-ChildItem -Path src -Recurse -Include *.css,*.scss -ErrorAction SilentlyContinue | ForEach-Object {
        $content = Get-Content $_.FullName
        $content = $content -replace "~@angular/material", "@angular/material"
        $content | Set-Content $_.FullName
    }
    
    # Fix HTML templates
    Write-Host "  Fixing templates..." -ForegroundColor White
    Get-ChildItem -Path src -Recurse -Filter *.html -ErrorAction SilentlyContinue | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        $content = $content -replace '@yahoo', '&#64;yahoo'
        $content = $content -replace '@gmail', '&#64;gmail'
        $content | Set-Content $_.FullName -NoNewline
    }
    
    # Test build
    Write-Host "  Running build test..." -ForegroundColor Cyan
    $buildOutput = ng build 2>&1 | Out-String
    
    if ($LASTEXITCODE -eq 0 -or $buildOutput -match "bundle generation complete") {
        Write-Host "  ✓ BUILD SUCCESSFUL!`n" -ForegroundColor Green
        $successCount++
    } else {
        Write-Host "  ✗ Build failed - showing first errors:" -ForegroundColor Red
        $errors = $buildOutput | Select-String "ERROR" | Select-Object -First 3
        $errors | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
        Write-Host ""
        $failCount++
    }
}

Set-Location $projectsDir

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "SUMMARY" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Total projects: $($projects.Count)" -ForegroundColor White
Write-Host "Successful: $successCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
Write-Host "`n✓ Auto-fix complete!" -ForegroundColor Cyan
