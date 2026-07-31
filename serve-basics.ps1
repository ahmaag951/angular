$projects = @(
    @{ Path = "01.components";                   Port = 4200 },
    @{ Path = "02.components-using-cli";          Port = 4201 },
    @{ Path = "03.template";                      Port = 4202 },
    @{ Path = "04.services";                      Port = 4203 },
    @{ Path = "05.dependency injection";          Port = 4204 },
    @{ Path = "06.services-using-cli";            Port = 4205 },
    @{ Path = "07.property-binding";              Port = 4206 },
    @{ Path = "08.attribute-binding";             Port = 4207 },
    @{ Path = "09. adding bootstrap";             Port = 4208 },
    @{ Path = "10.event-binding";                 Port = 4209 },
    @{ Path = "11.pipes";                         Port = 4210 },
    @{ Path = "12.directives-ngif";               Port = 4211 },
    @{ Path = "13.ng-switch-case";                Port = 4212 },
    @{ Path = "14.ng-for";                        Port = 4213 },
    @{ Path = "15. ng-class-ng-style";            Port = 4214 },
    @{ Path = "15.custom-directives";             Port = 4215 },
    @{ Path = "16.question-mark-operator";        Port = 4216 },
    @{ Path = "16.save-traversal-operator";       Port = 4217 },
    @{ Path = "17. reusable components";          Port = 4218 },
    @{ Path = "17.event-emitter";                 Port = 4219 },
    @{ Path = "18. styles";                       Port = 4220 },
    @{ Path = "19. ng-content ng-container";      Port = 4221 },
    @{ Path = "20. forms";                        Port = 4222 },
    @{ Path = "21. forms validations";            Port = 4223 },
    @{ Path = "22. other input types";            Port = 4224 }
)

$basePath  = "d:\github\angular\0.basics"
$logFolder = Join-Path $basePath "_serve-logs"
if (-not (Test-Path $logFolder)) { New-Item -ItemType Directory -Path $logFolder | Out-Null }

Write-Host "Starting all 0.basics Angular projects as background jobs..." -ForegroundColor Cyan
Write-Host ""

$jobs = @()

foreach ($project in $projects) {
    $fullPath = Join-Path $basePath $project.Path
    $port     = $project.Port
    $logFile  = Join-Path $logFolder ("port$port - " + ($project.Path -replace '[\\/:*?"<>|]', '_') + ".log")

    Write-Host "  Starting: $($project.Path)  -->  http://localhost:$port" -ForegroundColor Green

    $job = Start-Job -Name "basics-$port" -ScriptBlock {
        param($dir, $p, $log)
        Set-Location $dir
        ng serve --port $p 2>&1 | Tee-Object -FilePath $log
    } -ArgumentList $fullPath, $port, $logFile

    $jobs += $job
}

Write-Host ""
Write-Host "All $($jobs.Count) projects started as background jobs." -ForegroundColor Cyan
Write-Host "Logs are in: $logFolder" -ForegroundColor Gray
Write-Host ""
Write-Host "URLs (available once each project compiles):" -ForegroundColor Cyan
foreach ($project in $projects) {
    Write-Host "  http://localhost:$($project.Port)  ->  $($project.Path)" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "To check a job's output:   Receive-Job -Name basics-<port>" -ForegroundColor Gray
Write-Host "To stop all jobs:          Get-Job -Name 'basics-*' | Stop-Job | Remove-Job" -ForegroundColor Gray
