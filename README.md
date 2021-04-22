# ChartLibrary
This is a chart library that makes it easier to create and manage charts in Google Sheets via Google App Script.


### Step 1: Importing the Library
1. Create a new Google Sheet
2. Import the Data want to graph into the Google Sheet
3. Open App Script Dashboard ("Tools" -> "Script editor")
4. Add the Chart Library. (On left side toolbar -> "Libaries +") Copy and paste the below Script ID into the box.

Script ID ```13-lAMSZR4Be-fxACHohdcTBPtcarA5TJArDNAMYErZlL5dtRw1sjzLxQ```

5. Chose the latest version (currently 7)

You have successfully imported the library!


### Step 2: Create a Chart
Parameters:
 * {SpreadsheetApp.Range} dataRange
 * {SpreadsheetApp.Sheet} sheet - the sheet where the chart will be placed.
 * {String} title - this is the title on top of the sheet
 * {String} xlabel - x-axis label
 * {String} ylabel - y-axis label
 * {number} rowPos - the row at which the chart will be placed.
 * {number} colPos - the column at which the chart will be placed.

### Step 3: Update the Chart


