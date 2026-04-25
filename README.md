# PixInsight Printed Image Size

A PixInsight script that calculates the physical printed dimensions of an open image at a specified DPI.

## What It Does

Given an open image window and a target print resolution (DPI), the script computes and displays the printed size in both inches and centimeters.

## Usage

1. Open one or more images in PixInsight.
2. Run the script via **Script > Execute Script File** and select `ImagePrintedSize`.
3. In the dialog, choose the image window and set your target DPI (default: 300).
4. Click **Calculate** to see the printed dimensions.

Results are shown in a dialog and also written to the PixInsight Process Console.

### Example Output

```
=== Printed Size Calculator ===
Image: NGC_1234
Pixel Dimensions: 4096 x 3072 px
Resolution: 300 px/inch
Printed Size:
  Inches : 13.65" x 10.24"
  CM     : 34.67 cm x 26.01 cm
```

## Installation

Copy `ImagePrintedSize` to your PixInsight scripts directory:

- **Windows:** `C:\Program Files\PixInsight\src\scripts\`
- **macOS/Linux:** `/Applications/PixInsight/src/scripts/` (or equivalent)

Then run **Script > Feature Scripts** and add the directory if it isn't already listed.

## Requirements

- [PixInsight](https://pixinsight.com/) 1.8 or later
