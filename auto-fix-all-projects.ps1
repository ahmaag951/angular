# Automated Angular Projects Fix Script
# This script tests and fixes common issues across all Angular projects

param(
    [switch]$DryRun,
    [switch]$SkipNpmInstall
)

$ErrorActionPreference = "Continue"
$projectsDir = "d:\github\angular"
$logFile = "$projectsDir\auto-fix-log.txt"
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Initialize log
"==================================================================" | Set-Content $logFile
"Automated Fix Script Started at $timestamp" | Add-Content $logFile
"==================================================================" | Add-Content $logFile

# Get all directories except 0.basics and .git
$allDirs = Get-ChildItem -Path $projectsDir -Directory | 
    Where-Object { $_.Name -ne "0.basics" -and $_.Name -ne ".git" -and !$_.Name.EndsWith(".ps1") }

$stats = @{
    Total = 0
    Fixed = 0
    Failed = 0
    Skipped = 0
}

function Write-Log {
    param($Message, $Color = "White")
    Write-Host $Message -ForegroundColor $Color
    $Message | Add-Content $logFile
}

function Test-AngularProject {
    param($Path)
    return Test-Path (Join-Path $Path "angular.json")
}

function Fix-MaterialImports {
    param($FilePath)
    
    if (!(Test-Path $FilePath)) { return $false }
    
    $content = Get-Content $FilePath -Raw
    $originalContent = $content
    $changed = $false
    
    # Map of old barrel imports to new specific imports
    $materialModules = @{
        'MatAutocompleteModule' = '@angular/material/autocomplete'
        'MatBadgeModule' = '@angular/material/badge'
        'MatBottomSheetModule' = '@angular/material/bottom-sheet'
        'MatButtonModule' = '@angular/material/button'
        'MatButtonToggleModule' = '@angular/material/button-toggle'
        'MatCardModule' = '@angular/material/card'
        'MatCheckboxModule' = '@angular/material/checkbox'
        'MatChipsModule' = '@angular/material/chips'
        'MatDatepickerModule' = '@angular/material/datepicker'
        'MatDialogModule' = '@angular/material/dialog'
        'MatDividerModule' = '@angular/material/divider'
        'MatExpansionModule' = '@angular/material/expansion'
        'MatFormFieldModule' = '@angular/material/form-field'
        'MatGridListModule' = '@angular/material/grid-list'
        'MatIconModule' = '@angular/material/icon'
        'MatInputModule' = '@angular/material/input'
        'MatListModule' = '@angular/material/list'
        'MatMenuModule' = '@angular/material/menu'
        'MatNativeDateModule' = '@angular/material/core'
        'MatPaginatorModule' = '@angular/material/paginator'
        'MatProgressBarModule' = '@angular/material/progress-bar'
        'MatProgressSpinnerModule' = '@angular/material/progress-spinner'
        'MatRadioModule' = '@angular/material/radio'
        'MatRippleModule' = '@angular/material/core'
        'MatSelectModule' = '@angular/material/select'
        'MatSidenavModule' = '@angular/material/sidenav'
        'MatSliderModule' = '@angular/material/slider'
        'MatSlideToggleModule' = '@angular/material/slide-toggle'
        'MatSnackBarModule' = '@angular/material/snack-bar'
        'MatSortModule' = '@angular/material/sort'
        'MatStepperModule' = '@angular/material/stepper'
        'MatTableModule' = '@angular/material/table'
        'MatTabsModule' = '@angular/material/tabs'
        'MatToolbarModule' = '@angular/material/toolbar'
        'MatTooltipModule' = '@angular/material/tooltip'
        'MatTreeModule' = '@angular/material/tree'
        'MatDialog' = '@angular/material/dialog'
        'MatDialogRef' = '@angular/material/dialog'
        'MAT_DIALOG_DATA' = '@angular/material/dialog'
        'MatPaginator' = '@angular/material/paginator'
        'MatTableDataSource' = '@angular/material/table'
    }
    
    # Check if file has @angular/material imports that need fixing
    if ($content -match "from\s+['""]@angular/material['""]") {
        # Extract the import block
        if ($content -match "import\s*\{([^}]+)\}\s*from\s+['""]@angular/material['""]") {
            $imports = $matches[1]
            $modules = $imports -split ',' | ForEach-Object { $_.Trim() }
            
            # Build new imports
            $newImports = @()
            foreach ($module in $modules) {
                $moduleName = $module.Trim()
                if ($materialModules.ContainsKey($moduleName)) {
                    $newImports += "import { $moduleName } from '$($materialModules[$moduleName])';"
                }
            }
            
            if ($newImports.Count -gt 0) {
                $newImportBlock = $newImports -join "`n"
                $content = $content -replace "import\s*\{[^}]+\}\s*from\s+['""]@angular/material['""];?", $newImportBlock
                $changed = $true
            }
        }
    }
    
    if ($changed -and !$DryRun) {
        $content | Set-Content $FilePath -NoNewline
        return $true
    }
    
    return $changed
}

function Fix-CssImports {
    param($FilePath)
    
    if (!(Test-Path $FilePath)) { return $false }
    
    $content = Get-Content $FilePath -Raw
    $changed = $false
    
    # Fix ~@angular/material imports
    if ($content -match "~@angular/material") {
        $content = $content -replace "~@angular/material", "@angular/material"
        $changed = $true
    }
    
    # Add semicolons if missing
    if ($content -match "@import\s+['""][^'""]+['""](?!\s*;)") {
        $content = $content -replace "(@import\s+['""][^'""]+['""])(?!\s*;)", '$1;'
        $changed = $true
    }
    
    if ($changed -and !$DryRun) {
        $content | Set-Content $FilePath -NoNewline
        return $true
    }
    
    return $changed
}

function Fix-HttpModule {
    param($FilePath)
    
    if (!(Test-Path $FilePath)) { return $false }
    
    $content = Get-Content $FilePath -Raw
    $changed = $false
    
    # Replace @angular/http with @angular/common/http
    if ($content -match "@angular/http") {
        $content = $content -replace "from\s+['""]@angular/http['""]", "from '@angular/common/http'"
        $content = $content -replace "HttpModule", "HttpClientModule"
        $content = $content -replace "\bHttp\b(?!Client)", "HttpClient"
        $changed = $true
    }
    
    if ($changed -and !$DryRun) {
        $content | Set-Content $FilePath -NoNewline
        return $true
    }
    
    return $changed
}

function Fix-TypeScriptStrictMode {
    param($FilePath)
    
    if (!(Test-Path $FilePath)) { return $false }
    
    $lines = Get-Content $FilePath
    $changed = $false
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        
        # Fix uninitialized properties (add ! or = null)
        if ($line -match "^\s*(public|private|protected)?\s*(\w+):\s*(\w+)\s*;") {
            # Skip if already has initializer or !
            if ($line -notmatch "!" -and $line -notmatch "=") {
                $lines[$i] = $line -replace ";", "!;"
                $changed = $true
            }
        }
        
        # Fix implicit any parameters
        if ($line -match "(\w+)\s*\(([^)]*)\)") {
            if ($line -match "\(\s*(\w+)\s*\)" -and $line -notmatch ":\s*\w+") {
                # Simple parameter without type
                $lines[$i] = $line -replace "\((\w+)\)", '($1: any)'
                $changed = $true
            }
        }
    }
    
    if ($changed -and !$DryRun) {
        $lines | Set-Content $FilePath
        return $true
    }
    
    return $changed
}

function Install-MissingPackages {
    param($ProjectPath)
    
    if ($SkipNpmInstall) { return $false }
    
    Push-Location $ProjectPath
    try {
        $packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
        $needsInstall = $false
        $packagesToInstall = @()
        
        # Check for @angular/material usage
        $srcFiles = Get-ChildItem -Path "src" -Recurse -Filter "*.ts" -ErrorAction SilentlyContinue
        $hasAngularMaterial = $false
        foreach ($file in $srcFiles) {
            $content = Get-Content $file.FullName -Raw
            if ($content -match "@angular/material") {
                $hasAngularMaterial = $true
                break
            }
        }
        
        if ($hasAngularMaterial) {
            if (!$packageJson.dependencies.'@angular/material') {
                $packagesToInstall += "@angular/material@^19.0.0"
                $needsInstall = $true
            }
            if (!$packageJson.dependencies.'@angular/cdk') {
                $packagesToInstall += "@angular/cdk@^19.0.0"
                $needsInstall = $true
            }
        }
        
        # Check for bootstrap usage
        $styleFiles = Get-ChildItem -Path "src" -Recurse -Include "*.css","*.scss" -ErrorAction SilentlyContinue
        foreach ($file in $styleFiles) {
            $content = Get-Content $file.FullName -Raw
            if ($content -match "bootstrap") {
                if (!$packageJson.dependencies.'bootstrap') {
                    $packagesToInstall += "bootstrap@^5.3.0"
                    $needsInstall = $true
                }
                break
            }
        }
        
        if ($needsInstall -and !$DryRun) {
            Write-Log "  Installing packages: $($packagesToInstall -join ', ')" "Yellow"
            npm install $packagesToInstall --legacy-peer-deps 2>&1 | Out-Null
            return $true
        }
        
        return $needsInstall
    }
    finally {
        Pop-Location
    }
}

function Fix-Project {
    param($ProjectPath, $ProjectName)
    
    Write-Log "`n================================================================" "Cyan"
    Write-Log "Processing: $ProjectName" "Cyan"
    Write-Log "================================================================" "Cyan"
    
    if (!(Test-AngularProject $ProjectPath)) {
        Write-Log "  Skipped - Not an Angular project" "Yellow"
        $stats.Skipped++
        return
    }
    
    $stats.Total++
    $fixes = @()
    
    # Install missing packages
    if (Install-MissingPackages $ProjectPath) {
        $fixes += "Installed missing npm packages"
    }
    
    # Find and fix TypeScript files
    $tsFiles = Get-ChildItem -Path $ProjectPath -Recurse -Filter "*.ts" -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "dist" }
    
    foreach ($file in $tsFiles) {
        if (Fix-MaterialImports $file.FullName) {
            $fixes += "Fixed Material imports in $($file.Name)"
        }
        if (Fix-HttpModule $file.FullName) {
            $fixes += "Fixed HttpModule in $($file.Name)"
        }
        if (Fix-TypeScriptStrictMode $file.FullName) {
            $fixes += "Fixed TypeScript strict mode issues in $($file.Name)"
        }
    }
    
    # Find and fix CSS/SCSS files
    $styleFiles = Get-ChildItem -Path $ProjectPath -Recurse -Include "*.css","*.scss" -ErrorAction SilentlyContinue |
        Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "dist" }
    
    foreach ($file in $styleFiles) {
        if (Fix-CssImports $file.FullName) {
            $fixes += "Fixed CSS imports in $($file.Name)"
        }
    }
    
    if ($fixes.Count -gt 0) {
        Write-Log "  Applied fixes:" "Green"
        foreach ($fix in $fixes) {
            Write-Log "    - $fix" "Green"
        }
        
        # Test build
        if (!$DryRun) {
            Write-Log "  Testing build..." "Yellow"
            Push-Location $ProjectPath
            try {
                $buildOutput = ng build --configuration production 2>&1 | Out-String
                if ($LASTEXITCODE -eq 0 -or $buildOutput -match "bundle generation complete") {
                    Write-Log "  ✓ Build successful!" "Green"
                    $stats.Fixed++
                } else {
                    Write-Log "  ✗ Build still has errors" "Red"
                    $buildOutput | Select-String -Pattern "ERROR" | Select-Object -First 5 | 
                        ForEach-Object { Write-Log "    $_" "Red" }
                    $stats.Failed++
                }
            }
            finally {
                Pop-Location
            }
        } else {
            Write-Log "  [DRY RUN] Would test build here" "Yellow"
        }
    } else {
        Write-Log "  No automated fixes applied" "Gray"
        
        # Try build anyway to check status
        Write-Log "  Testing build..." "Yellow"
        Push-Location $ProjectPath
        try {
            $buildOutput = ng build --configuration production 2>&1 | Out-String
            if ($LASTEXITCODE -eq 0 -or $buildOutput -match "bundle generation complete") {
                Write-Log "  ✓ Already working!" "Green"
                $stats.Fixed++
            } else {
                Write-Log "  ✗ Has errors requiring manual fix" "Red"
                $buildOutput | Select-String -Pattern "ERROR" | Select-Object -First 3 | 
                    ForEach-Object { Write-Log "    $_" "Red" }
                $stats.Failed++
            }
        }
        finally {
            Pop-Location
        }
    }
}

# Main execution
Write-Log "`nStarting automated fix process..." "Cyan"
if ($DryRun) {
    Write-Log "[DRY RUN MODE - No changes will be made]" "Yellow"
}

foreach ($dir in $allDirs) {
    Fix-Project -ProjectPath $dir.FullName -ProjectName $dir.Name
}

# Summary
Write-Log "`n================================================================" "Cyan"
Write-Log "FINAL SUMMARY" "Cyan"
Write-Log "================================================================" "Cyan"
Write-Log "Total Angular projects: $($stats.Total)" "White"
Write-Log "Successfully fixed/working: $($stats.Fixed)" "Green"
Write-Log "Still failing: $($stats.Failed)" "Red"
Write-Log "Skipped (non-Angular): $($stats.Skipped)" "Yellow"
Write-Log "`nDetailed log saved to: $logFile" "Cyan"

if (!$DryRun) {
    Write-Log "`n✓ Automation complete!" "Green"
} else {
    Write-Log "`n✓ Dry run complete! Run without -DryRun to apply fixes." "Yellow"
}
