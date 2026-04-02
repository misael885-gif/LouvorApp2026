param(
  [string[]]$Producer = @("elite", "alagoa"),
  [int]$Size = 512,
  [int]$Quality = 82
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$coversRoot = Join-Path $projectRoot "covers"
$sourceManifestPath = Join-Path $coversRoot "manifest.json"
$thumbRoot = Join-Path $coversRoot "thumbs"
$thumbManifestPath = Join-Path $thumbRoot "manifest.json"

if (-not (Test-Path $sourceManifestPath)) {
  throw "Nao encontrei o manifesto principal em $sourceManifestPath"
}

function New-DirectoryIfMissing {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Force -Path $Path | Out-Null
  }
}

function Get-ThumbnailTargetPath {
  param(
    [string]$ProducerId,
    [System.IO.FileInfo]$File
  )

  $targetFolder = Join-Path $thumbRoot $ProducerId
  New-DirectoryIfMissing $targetFolder
  return Join-Path $targetFolder ($File.BaseName + ".jpg")
}

function Save-CoverThumbnail {
  param(
    [string]$SourcePath,
    [string]$TargetPath,
    [int]$TargetSize,
    [int]$JpegQuality
  )

  $sourceImage = [System.Drawing.Image]::FromFile($SourcePath)

  try {
    $sourceWidth = [double]$sourceImage.Width
    $sourceHeight = [double]$sourceImage.Height
    $cropSide = [Math]::Min($sourceWidth, $sourceHeight)
    $sourceX = [int][Math]::Round(($sourceWidth - $cropSide) / 2)
    $sourceY = [int][Math]::Round(($sourceHeight - $cropSide) / 2)

    $bitmap = New-Object System.Drawing.Bitmap($TargetSize, $TargetSize)

    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

      try {
        $graphics.Clear([System.Drawing.Color]::Black)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $destinationRect = New-Object System.Drawing.Rectangle(0, 0, $TargetSize, $TargetSize)
        $sourceRect = New-Object System.Drawing.Rectangle($sourceX, $sourceY, [int]$cropSide, [int]$cropSide)
        $graphics.DrawImage($sourceImage, $destinationRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
      } finally {
        $graphics.Dispose()
      }

      $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
      $encoderParameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $encoderParameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$JpegQuality)
      $bitmap.Save($TargetPath, $jpegCodec, $encoderParameters)
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }
}

function Resolve-ManifestPath {
  param([object]$Value)

  if ($Value -is [string]) {
    return [string]$Value
  }

  if ($Value -and $Value.path) {
    return [string]$Value.path
  }

  if ($Value -and $Value.src) {
    return [string]$Value.src
  }

  if ($Value -and $Value.url) {
    return [string]$Value.url
  }

  return ""
}

New-DirectoryIfMissing $thumbRoot

$processed = 0

foreach ($producerId in $Producer) {
  $normalizedProducer = ([string]$producerId).Trim().ToLowerInvariant()

  if (-not $normalizedProducer) {
    continue
  }

  $sourceFolder = Join-Path $coversRoot $normalizedProducer

  if (-not (Test-Path $sourceFolder)) {
    continue
  }

  $files = Get-ChildItem $sourceFolder -File | Where-Object {
    @(".png", ".jpg", ".jpeg", ".bmp", ".gif") -contains $_.Extension.ToLowerInvariant()
  }

  foreach ($file in $files) {
    $targetPath = Get-ThumbnailTargetPath -ProducerId $normalizedProducer -File $file
    $needsRefresh = -not (Test-Path $targetPath) -or $file.LastWriteTimeUtc -gt (Get-Item $targetPath).LastWriteTimeUtc

    if (-not $needsRefresh) {
      continue
    }

    Save-CoverThumbnail -SourcePath $file.FullName -TargetPath $targetPath -TargetSize $Size -JpegQuality $Quality
    $processed += 1
  }
}

$sourceManifest = Get-Content $sourceManifestPath -Raw | ConvertFrom-Json
$thumbManifest = [ordered]@{}

foreach ($entry in $sourceManifest.PSObject.Properties) {
  $key = [string]$entry.Name
  $rawPath = Resolve-ManifestPath $entry.Value

  if ([string]::IsNullOrWhiteSpace($rawPath)) {
    continue
  }

  if ($rawPath -notmatch '^\.\/covers\/([^\/]+)\/([^\/]+)\.[^\/.]+$') {
    continue
  }

  $producerId = $Matches[1]
  $fileStem = $Matches[2]
  $thumbRelativePath = "./covers/thumbs/$producerId/$fileStem.jpg"
  $thumbAbsolutePath = Join-Path $projectRoot ($thumbRelativePath -replace '^\./', '' -replace '/', '\')

  if (-not (Test-Path $thumbAbsolutePath)) {
    continue
  }

  $thumbManifest[$key] = $thumbRelativePath
}

$thumbManifest | ConvertTo-Json -Depth 6 | Set-Content -Path $thumbManifestPath -Encoding UTF8

[pscustomobject]@{
  ProcessedThumbnails = $processed
  ThumbManifestEntries = $thumbManifest.Count
  ThumbManifestPath = $thumbManifestPath
} | Format-List
