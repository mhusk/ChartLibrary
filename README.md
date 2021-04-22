# ChartLibrary
This is a chart library that makes it easier to create and manage charts in Google Sheets via Google App Script.


### Step 1: Importing the Library
1. Create a new Google Sheet
2. Open App Script Dashboard ("Tools" -> "Script editor")
3. Add the Chart Library. (On left side toolbar -> "Libaries +") Copy and paste the below Script ID into the box.

Script ID ```13-lAMSZR4Be-fxACHohdcTBPtcarA5TJArDNAMYErZlL5dtRw1sjzLxQ```

4. Chose the latest version (currently 7)

You have successfully imported the library!


### Step 2: Create a Chart
##### In Google Sheets
1. Import/Copy the data want to graph into the Google Sheet
2. Rename the sheet that has the data on it. I usually rename it to data.

##### In Google App Script Editor
1. Create a variable that represents your spreadsheet

```var ss = SpreadsheetApp.getActiveSpreadsheet();```

2. Create a variable that will get the Sheet that contains your data

```var dataSheet = ss.getSheetByName('data');```

3. Create a variable that will contain the data range you intend to graph

```var dataRange = dataSheet.getDataRange();```

4. Create a variable and call the ChartLibrary

```var chart = ChartLibrary.CreateLineGraph(dataRange,dataSheet,'Temperature','Date','Fahrenheit',2,2);```

Parameters:
 * {SpreadsheetApp.Range} dataRange
 * {SpreadsheetApp.Sheet} sheet - the sheet where the chart will be placed.
 * {String} title - this is the title on top of the sheet
 * {String} xlabel - x-axis label
 * {String} ylabel - y-axis label
 * {number} rowPos - the row at which the chart will be placed.
 * {number} colPos - the column at which the chart will be placed.

What your Code should look like
```
function myFunction() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName('data');
  var dataRange = dataSheet.getDataRange();
  var chart = ChartLibrary.CreateLineGraph(dataRange,dataSheet,'Temperature','Date','Fahrenheit',2,2);
}
```

5. Save the File and click Run. You will be asked to *Review Permissions*

Check out [How to Review Permissions for Google App Script](https://michaelhuskey.medium.com/how-to-review-permissions-for-google-app-script-492b4233526a) if you are unfamiliar

6. My line graph

![Screen Shot 2021-04-22 at 2 33 21 PM](https://user-images.githubusercontent.com/40217812/115767976-b3541580-a377-11eb-9854-172497bef1e2.png)


### Step 3: Update the Chart
What I think makes this library unique is how easy it allows you to update charts as the data changes. This is really useful if your data is growing because it is getting API Data or form inputs.

1. Use the ```ChartLibrary.UpdateChart()``` method
 * @param {String} name - this is the name of the chart, check title of the chart.
 * @param {SpreadsheetApp.Range} dataRange - the new data you want charted.
 * @param {SpreadsheetApp.Sheet} sheet - the sheet where the chart is.

Example

```
function UpdatingChart(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName('data');
  var dataRange = dataSheet.getRange(20,1,50,2);
  ChartLibrary.UpdateChart('Temperature', dataRange, dataSheet);
}
```
*Notice how the name is the same name as in the example before, this is important.*

2. Click Run on the Updating Chart function in your Google App Script console and check your chart.
![Screen Shot 2021-04-22 at 3 30 01 PM](https://user-images.githubusercontent.com/40217812/115774477-9d4a5300-a37f-11eb-92d5-9e41982346e4.png)


