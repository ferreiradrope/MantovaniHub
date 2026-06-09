# Build do Documento de Requisitos v2.0 (Markdown -> PDF via pandoc + xelatex)
Set-Location $PSScriptRoot
$pandoc = "C:\Users\pedro\MantovaniHub\_tools\pandoc-3.10\pandoc.exe"
$out = "Documento_Requisitos_Charcutaria_Mantovani_v2.pdf"

# Regenera o bloco SQL a partir do schema.sql (fonte única)
$schema = [System.IO.File]::ReadAllText("$PSScriptRoot\schema.sql")
$nl = "`r`n"
$md = '```sql' + $nl + $schema + $nl + '```' + $nl
$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText("$PSScriptRoot\build\04-sql.md", $md, $utf8)

if (Test-Path $out) { Remove-Item $out -Force }
& $pandoc build/00-meta.md build/01-backlog.md build/02-rf-rn-rnf.md build/03-modelo.md build/04-sql.md `
  -o $out --pdf-engine=xelatex --include-in-header=build/header.tex `
  -V geometry:margin=2.2cm -V mainfont="Georgia" -V monofont="Consolas" -V fontsize=11pt `
  -V colorlinks=true -V linkcolor=bordoescuro -V urlcolor=bordo -V toccolor=bordoescuro `
  --syntax-highlighting=tango 2>$null

if (Test-Path $out) {
  $f = Get-Item $out
  Write-Output "OK -> $out  ($([math]::Round($f.Length/1KB)) KB)"
} else {
  Write-Output "FALHOU"
}
