// ****************************************************************************
// PrintedSizeCalculator.js
// PixInsight Script
// ****************************************************************************

#feature-id    Utilities > PrintedSizeCalculator
#feature-info  Calculates the printed size of an image at a given DPI.

(function() {

    // --- Input Dialog ---
   var dialog = new Dialog();
   dialog.windowTitle = "Printed Size Calculator";

   var dpiLabel = new Label(dialog);
   dpiLabel.text = "Target DPI:";

   var dpiEdit = new SpinBox(dialog);
   dpiEdit.setRange(1, 9999);
   dpiEdit.value = 300;

   var dpiSizer = new Sizer(true);
   dpiSizer.spacing = 6;
   dpiSizer.add(dpiLabel);
   dpiSizer.add(dpiEdit);

   var fileLabel = new Label(dialog);
   fileLabel.text = "Image Window:";

   var fileCombo = new ComboBox(dialog);
   var windows = ImageWindow.windows;
   for (var i = 0; i < windows.length; i++) {
      fileCombo.addItem(windows[i].mainView.id);
   }

   var fileSizer = new Sizer(true);
   fileSizer.spacing = 6;
   fileSizer.add(fileLabel);
   fileSizer.add(fileCombo);

   var okButton = new PushButton(dialog);
   okButton.text = "Calculate";
   okButton.onClick = function() { dialog.ok(); };

   var cancelButton = new PushButton(dialog);
   cancelButton.text = "Cancel";
   cancelButton.onClick = function() { dialog.cancel(); };

   var buttonSizer = new Sizer(true);
   buttonSizer.spacing = 6;
   buttonSizer.addStretch();
   buttonSizer.add(okButton);
   buttonSizer.add(cancelButton);

   var mainSizer = new Sizer(false);
   mainSizer.margin  = 12;
   mainSizer.spacing = 8;
   mainSizer.add(fileSizer);
   mainSizer.add(dpiSizer);
   mainSizer.add(buttonSizer);

   dialog.sizer = mainSizer;

   if (dialog.execute() != 1) return;

   // --- Calculate ---
   var targetDPI = dpiEdit.value;
   var win       = windows[fileCombo.currentItem];
   var img       = win.mainView.image;

   var widthPx  = img.width;
   var heightPx = img.height;

   var inchX = widthPx  / targetDPI;
   var inchY = heightPx / targetDPI;
   var cmX   = inchX * 2.54;
   var cmY   = inchY * 2.54;

   // --- Results Dialog ---
   var results = new Dialog();
   results.windowTitle = "Printed Size Results";

   var lines = [
      "Image:       " + win.mainView.id,
      "Pixels:      " + widthPx + " x " + heightPx + " px",
      "Resolution:  " + targetDPI + " DPI",
      "",
      "Inches:      " + inchX.toFixed(2) + '" x ' + inchY.toFixed(2) + '"',
      "CM:          " + cmX.toFixed(2) + " cm x " + cmY.toFixed(2) + " cm"
   ];

   var resultsSizer = new Sizer(false);
   resultsSizer.margin  = 12;
   resultsSizer.spacing = 4;

   for (var i = 0; i < lines.length; i++) {
      var lbl = new Label(results);
      lbl.text = lines[i];
      resultsSizer.add(lbl);
   }

   var closeButton = new PushButton(results);
   closeButton.text = "Close";
   closeButton.onClick = function() { results.ok(); };

   var closeSizer = new Sizer(true);
   closeSizer.addStretch();
   closeSizer.add(closeButton);
   closeSizer.margin = 6;

   resultsSizer.add(closeSizer);
   results.sizer = resultsSizer;
   results.execute();

   // Also log to console
   console.writeln("=== Printed Size Calculator ===");
   console.writeln("Image: " + win.mainView.id);
   console.writeln("Pixel Dimensions: " + widthPx + " x " + heightPx + " px");
   console.writeln("Resolution: " + targetDPI + " px/inch");
   console.writeln("Printed Size:");
   console.writeln("  Inches : " + inchX.toFixed(2) + '" x ' + inchY.toFixed(2) + '"');
   console.writeln("  CM     : " + cmX.toFixed(2) + " cm x " + cmY.toFixed(2) + " cm");

})();