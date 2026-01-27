# Angular Upgrade Script for 0.basics projects
# Upgrades Angular 6-8 projects to Angular 19

$ErrorActionPreference = "Continue"
$basicsFolder = "d:\github\angular\0.basics"
$logFile = "d:\github\angular\upgrade-log.txt"

# Initialize log
"Angular Upgrade Log - $(Get-Date)" | Out-File $logFile

function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format "HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Write-Host $logMessage
    $logMessage | Out-File $logFile -Append
}

function Update-PackageJson {
    param($projectPath)
    
    $packageJsonPath = Join-Path $projectPath "package.json"
    if (-not (Test-Path $packageJsonPath)) {
        Write-Log "  package.json not found"
        return $false
    }
    
    $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json
    
    # Backup original
    Copy-Item $packageJsonPath "$packageJsonPath.backup"
    
    # Update dependencies
    $packageJson.dependencies = @{
        "@angular/animations" = "^19.0.0"
        "@angular/common" = "^19.0.0"
        "@angular/compiler" = "^19.0.0"
        "@angular/core" = "^19.0.0"
        "@angular/forms" = "^19.0.0"
        "@angular/platform-browser" = "^19.0.0"
        "@angular/platform-browser-dynamic" = "^19.0.0"
        "@angular/router" = "^19.0.0"
        "rxjs" = "^7.8.0"
        "tslib" = "^2.8.0"
        "zone.js" = "^0.15.0"
    }
    
    # Update devDependencies
    $packageJson.devDependencies = @{
        "@angular-devkit/build-angular" = "^19.0.0"
        "@angular/cli" = "^19.0.0"
        "@angular/compiler-cli" = "^19.0.0"
        "@types/jasmine" = "~5.1.0"
        "@types/node" = "^22.0.0"
        "jasmine-core" = "~5.5.0"
        "karma" = "~6.4.0"
        "karma-chrome-launcher" = "~3.2.0"
        "karma-coverage" = "~2.2.0"
        "karma-jasmine" = "~5.1.0"
        "karma-jasmine-html-reporter" = "~2.1.0"
        "typescript" = "~5.6.0"
    }
    
    $packageJson | ConvertTo-Json -Depth 10 | Set-Content $packageJsonPath
    Write-Log "  Updated package.json"
    return $true
}

function Update-TsConfig {
    param($projectPath)
    
    $tsconfigPath = Join-Path $projectPath "tsconfig.json"
    if (-not (Test-Path $tsconfigPath)) {
        Write-Log "  tsconfig.json not found"
        return
    }
    
    Copy-Item $tsconfigPath "$tsconfigPath.backup"
    
    $newTsConfig = @'
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
'@
    
    $newTsConfig | Set-Content $tsconfigPath
    Write-Log "  Updated tsconfig.json"
}

function Update-TsConfigApp {
    param($projectPath)
    
    # Check both locations
    $srcPath = Join-Path $projectPath "src\tsconfig.app.json"
    $rootPath = Join-Path $projectPath "tsconfig.app.json"
    
    $tsconfigPath = if (Test-Path $srcPath) { $srcPath } elseif (Test-Path $rootPath) { $rootPath } else { $null }
    
    if (-not $tsconfigPath) {
        Write-Log "  tsconfig.app.json not found"
        return
    }
    
    # If in src, we'll update it in root location
    $targetPath = $rootPath
    if (Test-Path $srcPath) {
        Copy-Item $srcPath "$srcPath.backup"
    }
    
    $newTsConfigApp = @'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
'@
    
    $newTsConfigApp | Set-Content $targetPath
    Write-Log "  Updated tsconfig.app.json"
}

function Update-TsConfigSpec {
    param($projectPath)
    
    # Check both locations
    $srcPath = Join-Path $projectPath "src\tsconfig.spec.json"
    $rootPath = Join-Path $projectPath "tsconfig.spec.json"
    
    $tsconfigPath = if (Test-Path $srcPath) { $srcPath } elseif (Test-Path $rootPath) { $rootPath } else { $null }
    
    if (-not $tsconfigPath) {
        Write-Log "  tsconfig.spec.json not found"
        return
    }
    
    # If in src, we'll update it in root location
    $targetPath = $rootPath
    if (Test-Path $srcPath) {
        Copy-Item $srcPath "$srcPath.backup"
    }
    
    $newTsConfigSpec = @'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
'@
    
    $newTsConfigSpec | Set-Content $targetPath
    Write-Log "  Updated tsconfig.spec.json"
}

function Update-AngularJson {
    param($projectPath)
    
    $angularJsonPath = Join-Path $projectPath "angular.json"
    if (-not (Test-Path $angularJsonPath)) {
        Write-Log "  angular.json not found"
        return
    }
    
    Copy-Item $angularJsonPath "$angularJsonPath.backup"
    
    $angularJson = Get-Content $angularJsonPath -Raw | ConvertFrom-Json
    
    # Get first project
    $projectNames = $angularJson.projects.PSObject.Properties.Name
    foreach ($projectName in $projectNames) {
        $project = $angularJson.projects.$projectName
        
        # Skip e2e projects
        if ($projectName -like "*-e2e") {
            continue
        }
        
        if ($project.architect.build) {
            # Update build configuration
            $project.architect.build.builder = "@angular-devkit/build-angular:application"
            
            # Update options
            if ($project.architect.build.options.main) {
                $project.architect.build.options | Add-Member -NotePropertyName "browser" -NotePropertyValue $project.architect.build.options.main -Force
                $project.architect.build.options.PSObject.Properties.Remove('main')
            }
            
            # Update polyfills
            $project.architect.build.options.polyfills = @("zone.js")
            
            # Update tsConfig path
            if ($project.architect.build.options.tsConfig) {
                $project.architect.build.options.tsConfig = "tsconfig.app.json"
            }
            
            # Update configurations
            $productionConfig = @{
                budgets = @(
                    @{
                        type = "initial"
                        maximumWarning = "500kB"
                        maximumError = "1MB"
                    },
                    @{
                        type = "anyComponentStyle"
                        maximumWarning = "2kB"
                        maximumError = "4kB"
                    }
                )
                outputHashing = "all"
            }
            
            $developmentConfig = @{
                optimization = $false
                extractLicenses = $false
                sourceMap = $true
            }
            
            $project.architect.build.configurations = @{
                production = $productionConfig
                development = $developmentConfig
            }
            
            $project.architect.build | Add-Member -NotePropertyName "defaultConfiguration" -NotePropertyValue "production" -Force
            
            # Remove deprecated options
            $project.architect.build.options.PSObject.Properties.Remove('extractCss')
            $project.architect.build.options.PSObject.Properties.Remove('vendorChunk')
            $project.architect.build.options.PSObject.Properties.Remove('buildOptimizer')
            $project.architect.build.options.PSObject.Properties.Remove('aot')
            $project.architect.build.options.PSObject.Properties.Remove('namedChunks')
        }
        
        # Update serve configuration
        if ($project.architect.serve) {
            $serveConfig = @{
                production = @{
                    buildTarget = "${projectName}:build:production"
                }
                development = @{
                    buildTarget = "${projectName}:build:development"
                }
            }
            
            $project.architect.serve.configurations = $serveConfig
            $project.architect.serve | Add-Member -NotePropertyName "defaultConfiguration" -NotePropertyValue "development" -Force
            $project.architect.serve.PSObject.Properties.Remove('options')
        }
        
        # Update test configuration
        if ($project.architect.test) {
            $project.architect.test.options.polyfills = @("zone.js", "zone.js/testing")
            $project.architect.test.options.tsConfig = "tsconfig.spec.json"
            $project.architect.test.options.PSObject.Properties.Remove('main')
            $project.architect.test.options.PSObject.Properties.Remove('karmaConfig')
        }
        
        # Remove lint (tslint deprecated)
        $project.architect.PSObject.Properties.Remove('lint')
    }
    
    # Remove e2e projects and defaultProject
    $angularJson.projects.PSObject.Properties | Where-Object { $_.Name -like "*-e2e" } | ForEach-Object {
        $angularJson.projects.PSObject.Properties.Remove($_.Name)
    }
    $angularJson.PSObject.Properties.Remove('defaultProject')
    
    $angularJson | ConvertTo-Json -Depth 20 | Set-Content $angularJsonPath
    Write-Log "  Updated angular.json"
}

function Add-StandaloneFalse {
    param($projectPath)
    
    $srcPath = Join-Path $projectPath "src\app"
    if (-not (Test-Path $srcPath)) {
        Write-Log "  src/app folder not found"
        return
    }
    
    # Find all .ts files with @Component decorator
    $componentFiles = Get-ChildItem -Path $srcPath -Filter "*.ts" -Recurse
    
    foreach ($file in $componentFiles) {
        $content = Get-Content $file.FullName -Raw
        
        # Check if file has @Component and doesn't already have standalone
        if ($content -match '@Component\s*\(' -and $content -notmatch 'standalone\s*:') {
            # Add standalone: false to component decorator
            $updatedContent = $content -replace '(@Component\s*\(\s*\{[^}]*?)(\})', '$1,  standalone: false$2'
            
            # Also handle @NgModule
            $updatedContent = $updatedContent -replace '(@NgModule\s*\(\s*\{[^}]*?)(\})', '$1,  standalone: false$2'
            
            if ($updatedContent -ne $content) {
                Set-Content $file.FullName -Value $updatedContent
                Write-Log "  Added standalone: false to $($file.Name)"
            }
        }
    }
}

function Install-Dependencies {
    param($projectPath)
    
    Push-Location $projectPath
    
    # Remove old dependencies
    if (Test-Path "node_modules") {
        Write-Log "  Removing node_modules..."
        Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
    }
    
    if (Test-Path "package-lock.json") {
        Write-Log "  Removing package-lock.json..."
        Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
    }
    
    Write-Log "  Running npm install --legacy-peer-deps..."
    $output = npm install --legacy-peer-deps 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Log "  npm install successful"
        Pop-Location
        return $true
    } else {
        Write-Log "  npm install failed"
        Write-Log "  Error: $output"
        Pop-Location
        return $false
    }
}

# Main execution
Write-Log "=========================================="
Write-Log "Starting Angular Upgrade Process"
Write-Log "Target: $basicsFolder"
Write-Log "=========================================="

# Find all Angular projects
$projects = Get-ChildItem -Path $basicsFolder -Directory | Where-Object {
    Test-Path (Join-Path $_.FullName "angular.json")
}

Write-Log "Found $($projects.Count) Angular projects"
Write-Log ""

$successCount = 0
$failCount = 0
$skippedCount = 0

foreach ($project in $projects) {
    Write-Log "=========================================="
    Write-Log "Processing: $($project.Name)"
    Write-Log "=========================================="
    
    try {
        # Check if already upgraded
        $packageJsonPath = Join-Path $project.FullName "package.json"
        if (Test-Path $packageJsonPath) {
            $packageContent = Get-Content $packageJsonPath -Raw
            if ($packageContent -match '@angular/core.*19') {
                Write-Log "  Already upgraded to Angular 19, skipping..."
                $skippedCount++
                continue
            }
        }
        
        # Step 1: Update package.json
        if (-not (Update-PackageJson -projectPath $project.FullName)) {
            Write-Log "  Failed to update package.json"
            $failCount++
            continue
        }
        
        # Step 2: Update TypeScript configs
        Update-TsConfig -projectPath $project.FullName
        Update-TsConfigApp -projectPath $project.FullName
        Update-TsConfigSpec -projectPath $project.FullName
        
        # Step 3: Update angular.json
        Update-AngularJson -projectPath $project.FullName
        
        # Step 4: Add standalone: false to components
        Add-StandaloneFalse -projectPath $project.FullName
        
        # Step 5: Install dependencies
        if (Install-Dependencies -projectPath $project.FullName) {
            Write-Log "Successfully upgraded: $($project.Name)"
            $successCount++
        } else {
            Write-Log "Upgraded configs but npm install failed: $($project.Name)"
            $failCount++
        }
        
    } catch {
        Write-Log "Error processing $($project.Name): $_"
        $failCount++
    }
    
    Write-Log ""
}

Write-Log "=========================================="
Write-Log "Upgrade Summary"
Write-Log "=========================================="
Write-Log "Successful: $successCount"
Write-Log "Failed: $failCount"
Write-Log "Skipped: $skippedCount"
Write-Log "Total Projects: $($projects.Count)"
Write-Log "=========================================="
Write-Log "Log saved to: $logFile"

Write-Host "Script completed! Check the log file for details: $logFile" -ForegroundColor Green
