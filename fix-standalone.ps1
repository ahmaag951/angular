# Fix Standalone False Formatting Issues
# This script fixes malformed standalone: false placements in all 0.basics projects

$ErrorActionPreference = "Continue"
$basicsFolder = "d:\github\angular\0.basics"
$logFile = "d:\github\angular\standalone-fix-log.txt"
$fixedCount = 0
$errorCount = 0

function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format "HH:mm:ss"
    $logMessage = "[$timestamp] $Message"
    Write-Host $logMessage
    $logMessage | Out-File $logFile -Append
}

"Standalone Fix Log - $(Get-Date)" | Out-File $logFile

Write-Log "=========================================="
Write-Log "Starting Standalone Fix Process"
Write-Log "Target: $basicsFolder"
Write-Log "=========================================="

# Find all TypeScript component files
$tsFiles = Get-ChildItem -Path $basicsFolder -Filter "*.ts" -Recurse | Where-Object {
    $_.FullName -like "*\src\app\*" -and $_.FullName -notlike "*\node_modules\*"
}

Write-Log "Found $($tsFiles.Count) TypeScript files to check"
Write-Log ""

foreach ($file in $tsFiles) {
    try {
        $content = Get-Content $file.FullName -Raw
        $originalContent = $content
        $changed = $false
        
        # Pattern 1: Fix malformed standalone on same line as styleUrls/templateUrl
        # Example: styleUrls: ['./app.component.css'],  standalone: false})
        if ($content -match ',\s*standalone:\s*false\s*\}') {
            # First, fix the case where it's on the same line
            $content = $content -replace "(\['[^']+'\]|\])\s*,\s*standalone:\s*false\s*\}",('$1' + "`n,  standalone: false`n}")
            $content = $content -replace "(\['[^']+'\])\s*\n\s*,\s*standalone:\s*false",('$1,' + "`n  standalone: false")
            $changed = $true
        }
        
        # Pattern 2: Fix malformed comma placement
        # Example: styleUrls: ['./app.component.css']<newline>,  standalone: false})
        if ($content -match "(\]|\))\s*\r?\n\s*,\s*standalone:\s*false\s*\}") {
            $content = $content -replace "(\]|\))\s*\r?\n\s*,\s*standalone:\s*false\s*\}",('$1,' + "`n  standalone: false`n}")
            $changed = $true
        }
        
        # Pattern 3: Fix standalone inside template/styles strings
        # This is the critical case like in project 18
        if ($content -match '(template|styles):\s*[\[`][^`\]]*,\s*standalone:\s*false\s*\}') {
            Write-Log "  WARNING: Found standalone inside template/styles string in $($file.Name)"
            
            # Special handling for styles array
            if ($content -match 'styles:\s*\[\s*`[^`]*,\s*standalone:\s*false\s*\}') {
                # Remove the malformed standalone from inside the styles string
                $content = $content -replace '(styles:\s*\[\s*`[^`]*),\s*standalone:\s*false\s*\}','$1}'
                # Add proper standalone after the styles array closes
                $content = $content -replace '(\],\s*\r?\n)(\s*)(encapsulation|\/\*|\})',('$1$2standalone: false,' + "`n" + '$2$3')
                $changed = $true
            }
            
            # Special handling for template string
            if ($content -match 'template:\s*`[^`]*,\s*standalone:\s*false\s*\}') {
                # Remove the malformed standalone from inside the template string
                $content = $content -replace '(template:\s*`[^`]*),\s*standalone:\s*false\s*\}','$1}'
                # Add proper standalone after the template closes
                $content = $content -replace '(`,\s*\r?\n)(\s*)(styleUrls|styles|encapsulation|\})',('$1$2standalone: false,' + "`n" + '$2$3')
                $changed = $true
            }
        }
        
        # Pattern 4: Clean up double commas or misplaced commas
        $content = $content -replace ',\s*,',','
        
        # Pattern 5: Ensure proper formatting of standalone property
        $content = $content -replace ',\s*standalone:\s*false\s*\}',(',' + "`n  standalone: false`n}")
        
        if ($content -ne $originalContent) {
            # Create backup
            Copy-Item $file.FullName "$($file.FullName).bak" -Force
            
            # Write fixed content
            Set-Content $file.FullName -Value $content -NoNewline
            
            Write-Log "Fixed: $($file.FullName)"
            $fixedCount++
        }
        
    } catch {
        Write-Log "ERROR processing $($file.FullName): $_"
        $errorCount++
    }
}

Write-Log ""
Write-Log "=========================================="
Write-Log "Fix Summary"
Write-Log "=========================================="
Write-Log "Files Fixed: $fixedCount"
Write-Log "Errors: $errorCount"
Write-Log "Total Files Checked: $($tsFiles.Count)"
Write-Log "=========================================="
Write-Log "Log saved to: $logFile"

Write-Host "`nScript completed! Check the log file for details: $logFile" -ForegroundColor Green

if ($fixedCount -gt 0) {
    Write-Host "`nBackup files created with .bak extension" -ForegroundColor Yellow
    Write-Host "If everything looks good, you can delete them with:" -ForegroundColor Yellow
    Write-Host "Get-ChildItem -Path '$basicsFolder' -Filter '*.bak' -Recurse | Remove-Item" -ForegroundColor Gray
}
