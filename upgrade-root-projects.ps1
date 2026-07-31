# Upgrade root-level Angular projects to Angular 19

$rootFolder = "d:\github\angular"
$logFile = "$rootFolder\upgrade-root-log.txt"

# Clear log file
if (Test-Path $logFile) { Remove-Item $logFile }

function Write-Log {
    param($Message, $Color = "White")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Add-Content -Path $logFile -Value $logMessage
    Write-Host $Message -ForegroundColor $Color
}

function Update-PackageJson {
    param($ProjectPath)
    
    $packageJsonPath = Join-Path $ProjectPath "package.json"
    if (-not (Test-Path $packageJsonPath)) {
        return $false
    }
    
    # Create backup
    Copy-Item $packageJsonPath "$packageJsonPath.backup" -Force
    
    $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
    
    # Update Angular packages
    $angularPackages = @(
        '@angular/animations', '@angular/common', '@angular/compiler',
        '@angular/core', '@angular/forms', '@angular/platform-browser',
        '@angular/platform-browser-dynamic', '@angular/router',
        '@angular/material', '@angular/cdk', '@angular/fire'
    )
    
    foreach ($pkg in $angularPackages) {
        if ($packageJson.dependencies.$pkg) {
            $packageJson.dependencies.$pkg = "^19.0.0"
        }
    }
    
    # Update dev dependencies
    if ($packageJson.devDependencies.'@angular/cli') {
        $packageJson.devDependencies.'@angular/cli' = "^19.0.0"
    }
    if ($packageJson.devDependencies.'@angular/compiler-cli') {
        $packageJson.devDependencies.'@angular/compiler-cli' = "^19.0.0"
    }
    if ($packageJson.devDependencies.'@angular-devkit/build-angular') {
        $packageJson.devDependencies.'@angular-devkit/build-angular' = "^19.0.0"
    }
    if ($packageJson.devDependencies.'typescript') {
        $packageJson.devDependencies.'typescript' = "~5.6.0"
    }
    if ($packageJson.devDependencies.'zone.js') {
        $packageJson.devDependencies.'zone.js' = "~0.15.0"
    }
    
    # Update rxjs
    if ($packageJson.dependencies.'rxjs') {
        $packageJson.dependencies.'rxjs' = "^7.8.0"
    }
    
    # Remove deprecated packages
    $deprecated = @('@angular/http', 'tslint', 'protractor', 'core-js', '@schematics/update')
    foreach ($dep in $deprecated) {
        if ($packageJson.dependencies.$dep) {
            $packageJson.dependencies.PSObject.Properties.Remove($dep)
        }
        if ($packageJson.devDependencies.$dep) {
            $packageJson.devDependencies.PSObject.Properties.Remove($dep)
        }
    }
    
    # Save updated package.json
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath
    return $true
}

function Update-TsConfig {
    param($ProjectPath)
    
    $tsConfigPath = Join-Path $ProjectPath "tsconfig.json"
    if (-not (Test-Path $tsConfigPath)) {
        return
    }
    
    Copy-Item $tsConfigPath "$tsConfigPath.backup" -Force
    
    $content = Get-Content $tsConfigPath -Raw
    $tsConfig = $content | ConvertFrom-Json
    
    # Update compiler options
    $tsConfig.compilerOptions.target = "ES2022"
    $tsConfig.compilerOptions.module = "ES2022"
    $tsConfig.compilerOptions.lib = @("ES2022", "dom")
    
    if (-not $tsConfig.compilerOptions.moduleResolution) {
        $tsConfig.compilerOptions | Add-Member -NotePropertyName "moduleResolution" -NotePropertyValue "bundler" -Force
    } else {
        $tsConfig.compilerOptions.moduleResolution = "bundler"
    }
    
    # Enable strict mode
    $tsConfig.compilerOptions.strict = $true
    
    $tsConfig | ConvertTo-Json -Depth 10 | Set-Content $tsConfigPath
}

function Update-AngularJson {
    param($ProjectPath)
    
    $angularJsonPath = Join-Path $ProjectPath "angular.json"
    if (-not (Test-Path $angularJsonPath)) {
        return
    }
    
    Copy-Item $angularJsonPath "$angularJsonPath.backup" -Force
    
    $content = Get-Content $angularJsonPath -Raw
    
    # Replace browser builder
    $content = $content -replace '@angular-devkit/build-angular:browser', '@angular-devkit/build-angular:application'
    
    # Remove es5BrowserSupport
    $content = $content -replace '"es5BrowserSupport":\s*true,\s*', ''
    $content = $content -replace ',\s*"es5BrowserSupport":\s*true', ''
    
    # Update polyfills to array format if it's a string
    $content = $content -replace '"polyfills":\s*"([^"]+)"', '"polyfills": ["$1"]'
    
    $content | Set-Content $angularJsonPath
}

function Add-StandaloneFalse {
    param($ProjectPath)
    
    $componentFiles = Get-ChildItem -Path $ProjectPath -Recurse -Filter "*.component.ts" -ErrorAction SilentlyContinue
    $directiveFiles = Get-ChildItem -Path $ProjectPath -Recurse -Filter "*.directive.ts" -ErrorAction SilentlyContinue
    $pipeFiles = Get-ChildItem -Path $ProjectPath -Recurse -Filter "*.pipe.ts" -ErrorAction SilentlyContinue
    
    $allFiles = $componentFiles + $directiveFiles + $pipeFiles
    
    foreach ($file in $allFiles) {
        $content = Get-Content $file.FullName -Raw
        
        # Check if it has @Component, @Directive, or @Pipe decorator and doesn't have standalone
        if ($content -match '@(Component|Directive|Pipe)\s*\(' -and $content -notmatch 'standalone\s*:') {
            # Add standalone: false to the decorator
            $content = $content -replace '(@(?:Component|Directive|Pipe)\s*\(\s*\{)', '$1`n  standalone: false,'
            $content | Set-Content $file.FullName
        }
    }
}

function Install-Dependencies {
    param($ProjectPath)
    
    Push-Location $ProjectPath
    Write-Log "  Installing dependencies..." "Yellow"
    $output = npm install --legacy-peer-deps 2>&1
    Pop-Location
    
    if ($LASTEXITCODE -eq 0) {
        return $true
    } else {
        Write-Log "  npm install failed: $output" "Red"
        return $false
    }
}

# Main execution
Write-Log "========================================" "Cyan"
Write-Log "Angular 19 Upgrade - Root Level Projects" "Cyan"
Write-Log "========================================" "Cyan"
Write-Log ""

# Get all Angular projects in root (exclude 0.basics folder and node_modules)
$projects = Get-ChildItem -Path $rootFolder -Directory | Where-Object {
    $_.Name -ne '0.basics' -and 
    $_.Name -ne 'node_modules' -and
    (Test-Path (Join-Path $_.FullName "angular.json"))
} | Sort-Object Name

Write-Log "Found $($projects.Count) projects to upgrade" "Cyan"
Write-Log ""

$successCount = 0
$failCount = 0
$skippedCount = 0

foreach ($project in $projects) {
    $projectName = $project.Name
    $projectPath = $project.FullName
    
    Write-Log "========================================" "Cyan"
    Write-Log "Processing: $projectName" "Yellow"
    Write-Log "========================================" "Cyan"
    
    # Check if already upgraded
    $packageJsonPath = Join-Path $projectPath "package.json"
    if (Test-Path $packageJsonPath) {
        $packageContent = Get-Content $packageJsonPath -Raw
        if ($packageContent -match '"@angular/core":\s*"\^19\.') {
            Write-Log "  Already upgraded to Angular 19, skipping..." "Green"
            $skippedCount++
            Write-Log ""
            continue
        }
    }
    
    try {
        # Update package.json
        Write-Log "  Updating package.json..." "Yellow"
        if (-not (Update-PackageJson -ProjectPath $projectPath)) {
            Write-Log "  No package.json found, skipping..." "Red"
            $skippedCount++
            continue
        }
        
        # Update tsconfig.json
        Write-Log "  Updating tsconfig.json..." "Yellow"
        Update-TsConfig -ProjectPath $projectPath
        
        # Update angular.json
        Write-Log "  Updating angular.json..." "Yellow"
        Update-AngularJson -ProjectPath $projectPath
        
        # Add standalone: false
        Write-Log "  Adding standalone: false to components/directives/pipes..." "Yellow"
        Add-StandaloneFalse -ProjectPath $projectPath
        
        # Install dependencies
        if (Install-Dependencies -ProjectPath $projectPath) {
            Write-Log "  ✓ Successfully upgraded $projectName" "Green"
            $successCount++
        } else {
            Write-Log "  ✗ Failed to install dependencies for $projectName" "Red"
            $failCount++
        }
        
    } catch {
        Write-Log "  ✗ Error upgrading ${projectName}: $_" "Red"
        $failCount++
    }
    
    Write-Log ""
}

Write-Log "========================================" "Cyan"
Write-Log "Upgrade Summary" "Cyan"
Write-Log "========================================" "Cyan"
Write-Log "Total projects: $($projects.Count)" "White"
Write-Log "Successfully upgraded: $successCount" "Green"
Write-Log "Failed: $failCount" "Red"
Write-Log "Skipped (already upgraded): $skippedCount" "Yellow"
Write-Log "" "White"
Write-Log "Log file: $logFile" "Cyan"
Write-Log "========================================" "Cyan"
