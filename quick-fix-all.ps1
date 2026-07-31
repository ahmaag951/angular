# Quick Fix All Angular Projects
# Simplified automated fix script

$projectsDir = "d:\github\angular"
$logFile = "$projectsDir\quick-fix-log.txt"

"Quick Fix Started: $(Get-Date)" | Set-Content $logFile

# Get Angular projects
$projects = Get-ChildItem -Path $projectsDir -Directory | 
    Where-Object { 
        $_.Name -ne "0.basics" -and 
        $_.Name -ne ".git" -and 
        (Test-Path (Join-Path $_.FullName "angular.json"))
    }

Write-Host "Found $($projects.Count) Angular projects" -ForegroundColor Cyan

foreach ($project in $projects) {
    Write-Host "`n=== $($project.Name) ===" -ForegroundColor Yellow
    $projectPath = $project.FullName
    
    Push-Location $projectPath
    
    try {
        # Fix 1: Install @angular/material if needed
        $srcFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.ts" -ErrorAction SilentlyContinue
        $needsMaterial = $false
        
        foreach ($file in $srcFiles) {
            if ((Get-Content $file.FullName -Raw) -match "@angular/material") {
                $needsMaterial = $true
                break
            }
        }
        
        if ($needsMaterial) {
            $pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
            if (!$pkg.dependencies.'@angular/material') {
                Write-Host "  Installing @angular/material..." -ForegroundColor Cyan
                npm install @angular/material@^19.0.0 @angular/cdk@^19.0.0 --legacy-peer-deps 2>&1 | Out-Null
                Write-Host "  ✓ Installed" -ForegroundColor Green
            }
        }
        
        # Fix 2: Update Material imports in TypeScript files
        $tsFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.ts" -ErrorAction SilentlyContinue
        foreach ($file in $tsFiles) {
            $content = Get-Content $file.FullName -Raw
            $updated = $false
            
            # Fix barrel imports for common Material modules
            if ($content -match "from ['""]@angular/material['""]") {
                $content = $content -replace "import \{ MatDialog \} from '@angular/material'", "import { MatDialog } from '@angular/material/dialog'"
                $content = $content -replace "import \{ MatDialogRef, MAT_DIALOG_DATA \} from '@angular/material'", "import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'"
                $content = $content -replace "import \{ MatPaginator, MatTableDataSource \} from '@angular/material'", "import { MatPaginator } from '@angular/material/paginator';`nimport { MatTableDataSource } from '@angular/material/table'"
                $content = $content -replace "import \{ MatPaginator \} from '@angular/material'", "import { MatPaginator } from '@angular/material/paginator'"
                $content = $content -replace "import \{ MatTableDataSource \} from '@angular/material'", "import { MatTableDataSource } from '@angular/material/table'"
                $updated = $true
            }
            
            # Fix HttpModule
            if ($content -match "@angular/http['""]") {
                $content = $content -replace "@angular/http", "@angular/common/http"
                $content = $content -replace "HttpModule", "HttpClientModule"
                $content = $content -replace "\bHttp\b(?!Client)", "HttpClient"
                $updated = $true
            }
            
            if ($updated) {
                $content | Set-Content $file.FullName -NoNewline
                Write-Host "  Fixed: $($file.Name)" -ForegroundColor Green
            }
        }
        
        # Fix 3: Update CSS imports
        $styleFiles = Get-ChildItem -Path "src" -Recurse -Include "*.css","*.scss" -ErrorAction SilentlyContinue
        foreach ($file in $styleFiles) {
            $content = Get-Content $file.FullName -Raw
            $updated = $false
            
            if ($content -match "~@angular/material") {
                $content = $content -replace "~@angular/material", "@angular/material"
                $updated = $true
            }
            
            if ($content -match "@import ['""][^'""]+['""](?!;)") {
                $content = $content -replace "(@import ['""][^'""]+['""])(?!;)", '$1;'
                $updated = $true
            }
            
            # Fix @ symbol in templates
            if ($content -match "@yahoo" -or $content -match "@gmail") {
                $content = $content -replace "@yahoo", "&#64;yahoo"
                $content = $content -replace "@gmail", "&#64;gmail"
                $updated = $true
            }
            
            if ($updated) {
                $content | Set-Content $file.FullName -NoNewline
                Write-Host "  Fixed: $($file.Name)" -ForegroundColor Green
            }
        }
        
        # Fix 4: Update HTML templates
        $htmlFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.html" -ErrorAction SilentlyContinue
        foreach ($file in $htmlFiles) {
            $content = Get-Content $file.FullName -Raw
            $updated = $false
            
            # Fix @ symbol
            if ($content -match ">@yahoo" -or $content -match ">@gmail") {
                $content = $content -replace ">@yahoo", ">&#64;yahoo"
                $content = $content -replace ">@gmail", ">&#64;gmail"
                $updated = $true
            }
            
            if ($updated) {
                $content | Set-Content $file.FullName -NoNewline
                Write-Host "  Fixed: $($file.Name)" -ForegroundColor Green
            }
        }
        
        # Test build
        Write-Host "  Testing build..." -ForegroundColor Cyan
        $buildResult = ng build 2>&1 | Out-String
        
        if ($LASTEXITCODE -eq 0 -or $buildResult -match "bundle generation complete") {
            Write-Host "  ✓ BUILD SUCCESS" -ForegroundColor Green
            "$($project.Name) - SUCCESS" | Add-Content $logFile
        } else {
            Write-Host "  ✗ BUILD FAILED" -ForegroundColor Red
            $errors = $buildResult | Select-String -Pattern "\[ERROR\]" | Select-Object -First 2
            $errors | ForEach-Object { Write-Host "    $($_.Line)" -ForegroundColor Red }
            "$($project.Name) - FAILED" | Add-Content $logFile
        }
    }
    catch {
        Write-Host "  Error: $_" -ForegroundColor Red
        "$($project.Name) - ERROR: $_" | Add-Content $logFile
    }
    finally {
        Pop-Location
    }
}

Write-Host "`n✓ Script complete! Check $logFile for results" -ForegroundColor Cyan
