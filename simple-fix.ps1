# Simple Fix Script for Standalone Issues
# Fixes the malformed standalone: false placements

$basicsFolder = "d:\github\angular\0.basics"
$fixedFiles = @()

# Find all component TypeScript files
$files = Get-ChildItem -Path $basicsFolder -Filter "*.component.ts" -Recurse | Where-Object {
    $_.FullName -notlike "*\node_modules\*" -and $_.FullName -like "*\src\app\*"
}

Write-Host "Found $($files.Count) component files to check" -ForegroundColor Cyan
Write-Host ""

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Pattern 1: Fix styleUrls/templateUrl array],  standalone: false})
    $content = $content -replace "(\['[^']+'\])\s*\n\s*,\s*standalone:\s*false\s*\}","`$1,`r`n  standalone: false`r`n}"
    
    # Pattern 2: Fix inside CSS/template strings
    $content = $content -replace "(\s+background-color:\s+[^;]+;)\s*,\s*standalone:\s*false\s*\}","`$1`r`n    }"
    
    # Pattern 3: Standard cleanup - styleUrls: []<newline>,  standalone
    $content = $content -replace "(\])\s*\r?\n\s*,\s*standalone:\s*false\s*\}","`$1,`r`n  standalone: false`r`n}"
    
    if ($content -ne $originalContent) {
        Set-Content $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.FullName)" -ForegroundColor Green
        $fixedFiles += $file.Name
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary: Fixed $($fixedFiles.Count) files" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
