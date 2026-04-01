$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $PSScriptRoot
$coversRoot = Join-Path $projectRoot "covers"
$importRoot = Join-Path $projectRoot "covers-import"
$manifestPath = Join-Path $coversRoot "manifest.json"

function Clean-Text {
  param([string]$Value)

  if ($null -eq $Value) {
    return ""
  }

  return ([string]$Value).Trim() -replace "\s+", " "
}

function Normalize-Search {
  param([string]$Value)

  $normalized = Clean-Text $Value
  if (-not $normalized) {
    return ""
  }

  $formD = $normalized.ToLowerInvariant().Normalize([Text.NormalizationForm]::FormD)
  $builder = New-Object System.Text.StringBuilder

  foreach ($char in $formD.ToCharArray()) {
    if ([Globalization.CharUnicodeInfo]::GetUnicodeCategory($char) -ne [Globalization.UnicodeCategory]::NonSpacingMark) {
      [void]$builder.Append($char)
    }
  }

  return $builder.ToString()
}

function Normalize-BatchCoverKey {
  param([string]$Value)

  return (Normalize-Search $Value) -replace "[^a-z0-9]", ""
}

function Split-SongLabel {
  param([string]$Label)

  $cleaned = Clean-Text $Label
  $match = [regex]::Match($cleaned, "^(.*?)\s*-\s*(.+)$")

  if (-not $match.Success) {
    return @{
      artist = "Ministerio"
      title = $cleaned
    }
  }

  return @{
    artist = Clean-Text $match.Groups[1].Value
    title = Clean-Text $match.Groups[2].Value
  }
}

function Split-SongTitleVariant {
  param([string]$Title)

  $cleaned = Clean-Text $Title
  if (-not $cleaned) {
    return @{
      baseTitle = ""
      variant = ""
    }
  }

  $match = [regex]::Match($cleaned, "^(.*?)(?:\s*\(([^)]+)\))$")
  if (-not $match.Success) {
    return @{
      baseTitle = $cleaned
      variant = ""
    }
  }

  $baseTitle = Clean-Text $match.Groups[1].Value
  if (-not $baseTitle) {
    $baseTitle = $cleaned
  }

  return @{
    baseTitle = $baseTitle
    variant = Clean-Text $match.Groups[2].Value
  }
}

function Build-SongCatalogKey {
  param(
    [string]$Producer,
    [string]$Artist,
    [string]$Title
  )

  $safeProducer = if ((Clean-Text $Producer) -eq "alagoa") { "alagoa" } else { "elite" }
  $parts = Split-SongTitleVariant $Title
  $rawKey = if ($parts.variant) {
    "$safeProducer-$Artist-$($parts.baseTitle)-variant-$($parts.variant)"
  } else {
    "$safeProducer-$Artist-$($parts.baseTitle)"
  }

  return Normalize-BatchCoverKey $rawKey
}

function Import-ProducerCovers {
  param([string]$Producer)

  $producerImportRoot = Join-Path $importRoot $Producer
  $producerCoversRoot = Join-Path $coversRoot $Producer
  $manifestMap = @{}
  $processed = @()

  if (-not (Test-Path $producerImportRoot)) {
    return @{
      manifest = $manifestMap
      processed = $processed
      count = 0
    }
  }

  New-Item -ItemType Directory -Force $producerCoversRoot | Out-Null
  $files = Get-ChildItem $producerImportRoot -File | Sort-Object Name

  foreach ($file in $files) {
    $parts = Split-SongLabel ([IO.Path]::GetFileNameWithoutExtension($file.Name))
    $songKey = Build-SongCatalogKey -Producer $Producer -Artist $parts.artist -Title $parts.title

    if (-not $songKey) {
      continue
    }

    $songId = "seed-$songKey"
    $extension = $file.Extension.ToLowerInvariant()
    $destinationName = "$songId$extension"
    $destinationPath = Join-Path $producerCoversRoot $destinationName
    $relativePath = "./covers/$Producer/$destinationName"

    Copy-Item $file.FullName $destinationPath -Force
    $manifestMap[$songId] = $relativePath
    $manifestMap[$songKey] = $relativePath

    $processed += [pscustomobject]@{
      Source = $file.Name
      SongId = $songId
      SongKey = $songKey
      Path = $relativePath
    }
  }

  return @{
    manifest = $manifestMap
    processed = $processed
    count = $processed.Count
  }
}

$manifest = @{}
$eliteImport = Import-ProducerCovers "elite"
$alagoaImport = Import-ProducerCovers "alagoa"

foreach ($entry in $eliteImport.manifest.GetEnumerator()) {
  $manifest[$entry.Key] = $entry.Value
}

foreach ($entry in $alagoaImport.manifest.GetEnumerator()) {
  $manifest[$entry.Key] = $entry.Value
}

$manifestPayload = [ordered]@{}
foreach ($key in ($manifest.Keys | Sort-Object)) {
  $manifestPayload[$key] = $manifest[$key]
}

$manifestPayload | ConvertTo-Json | Set-Content $manifestPath -Encoding UTF8

[pscustomobject]@{
  EliteImportadas = $eliteImport.count
  AlagoaImportadas = $alagoaImport.count
  TotalEntradasManifest = $manifestPayload.Count
} | Format-List
