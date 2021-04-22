/**
 * @OnlyCurrentDoc
 */

var ss_ = SpreadsheetApp.getActiveSpreadsheet();

/**
 * This will update a graph that you have.
 * @param {String} name - this is the name of the chart, check title of the chart.
 * @param {SpreadsheetApp.Range} dataRange - the new data you want charted.
 * @param {SpreadsheetApp.Sheet} sheet - the sheet where the chart is.
 */
function UpdateChart(name, dataRange, sheet){
  var chart = FindTheChart_(name, sheet);
  var ranges = chart.getRanges();
  chart = chart.modify();
  ranges.forEach(function(range) {chart.removeRange(range)});
  var modifiedChart = chart.addRange(dataRange).build();
  sheet.updateChart(modifiedChart);
}


/**
 * This will create a line graph
 * @param {SpreadsheetApp.Range} dataRange
 * @param {SpreadsheetApp.Sheet} sheet - the sheet where the chart will be placed.
 * @param {String} title - this is the title on top of the sheet
 * @param {String} xlabel - x-axis label
 * @param {String} ylabel - y-axis label
 * @param {number} rowPos - the row at which the chart will be placed.
 * @param {number} colPos - the column at which the chart will be placed.
 */
function CreateLineGraph(dataRange, sheet, title, xlabel = '', ylabel = '', rowPos = 1, colPos = 1){
  CreateChartIDSheet_();
  var chartBuilder = sheet.newChart();
  chartBuilder
    .addRange(dataRange)
    .setChartType(Charts.ChartType.LINE)
    .setOption('title', title)
    .setOption('hAxis',{title: xlabel})
    .setOption('vAxis',{title: ylabel})
    .setOption('curveType', 'function')
    .setOption('height', 300) //Add this as an option
    .setOption('width', 600); //Add this as an option

  var chart = chartBuilder.setPosition(rowPos, colPos, 1, 1).build();
  sheet.insertChart(chart);

  AddChartID_(title, sheet);
  UpdateChartIDs_(sheet);
  
}

/**
 * This will get the chart IDs of all the charts on a given sheet
 * If the ChartID sheet does not exist this will make it.
 */
function GetChartIDs_(){
  var chartID_SHEET = ss_.getSheetByName('ChartIDs');
  var chartIDs = chartID_SHEET.getDataRange().getValues().slice(1);
  //var chartIDs = chartID_SHEET.getDataRange().getValues().slice(1).map(function(r){return r[1]});
  return chartIDs;
}

function CreateChartIDSheet_(){
  var chartID_SHEET = ss_.getSheetByName('ChartIDs');
  if(chartID_SHEET == null){
    ss_.insertSheet().setName('ChartIDs').hideSheet();
    var chartID_SHEET = ss_.getSheetByName('ChartIDs');
    chartID_SHEET.getRange('A1').setValue('Title');
    chartID_SHEET.getRange('B1').setValue('Chart ID');
    chartID_SHEET.getRange('C1').setValue('Sheet');
  }
}


/**
 * this will remove any IDs that are no longer on the sheet.
 * @param {SpreadsheetApp.Sheet} sheet - the sheet with the charts.
 */
function UpdateChartIDs_(sheet){
  var sheetName = sheet.getName().toUpperCase();
  var chartsOnSheet = sheet.getCharts(); //the charts on the sheet
  var chartsOnSheetJustID = chartsOnSheet.map(function(r){return r.getChartId()});
  var chartIDs = GetChartIDs_(); // my current list of chart IDs
  var justIDS = chartIDs.map(function(r){return r[1]});
  for(var i = 0; i < justIDS.length; i++){
    if(sheetName == chartIDs[i][2]){
      if(chartsOnSheetJustID.includes(justIDS[i]) == false){
        //Logger.log('This chart no longer exists');
        var id = justIDS[i].toString();
        RemoveID_(id);
      }
    }
  }
}

/**
 * Will remove the specific chart ID from the chart ID sheet
 * @param {string} id 
 */
function RemoveID_(id){
  var chartID_SHEET = ss_.getSheetByName('ChartIDs');
  var chartIDs = GetChartIDs_().map(function(r){return r[1].toString()});
  var row = chartIDs.indexOf(id) + 2; 
  chartID_SHEET.deleteRow(row);
}

/**
 * This will add the latest chart's name and ID to the list
 * @param {String} title - this is the title of the sheet.
 * @param {SpreadsheetApp.Sheet} sheet - the sheet where the chart will be placed.
 * @param {Object[]} chartIDs - this is the data from the chart ID
 */
function AddChartID_(title, sheet, chartIDs){
  var charts = sheet.getCharts();
  var chartIDs = GetChartIDs_().map(function(r){return r[1]});
  var chartID_SHEET = ss_.getSheetByName('ChartIDs');
  for(var i = 0; i < charts.length; i++){
    var chartID = charts[i].getChartId();
    if(chartIDs.includes(chartID) == false){
      chartID_SHEET.appendRow([title.toUpperCase(), chartID.toString(), sheet.getName().toUpperCase()]);
    }
  }
}



/**
 * This will find the chart
 * @param {String} name - this is the name of the chart, check title of the chart.
 * @param {SpreadsheetApp.Sheet} sheet - the sheet where the chart will be placed.
 * @returns {SpreadsheetApp.EmbeddedChart}
 */
function FindTheChart_(name, sheet){
  var nameUPPER = name.toUpperCase();
  var justNames = GetChartIDs_().map(function(r){return r[0]});
  var index = justNames.indexOf(nameUPPER);
  var chartID = GetChartIDs_()[index][1];
  var charts = sheet.getCharts();
  for(var i = 0; i < charts.length; i++){
    if(chartID == charts[i].getChartId()){
      //Logger.log('Found the chart!!!');
      var chart = charts[i];
      return chart;
    }
  }
}



