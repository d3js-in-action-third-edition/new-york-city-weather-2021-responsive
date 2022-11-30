Promise.all([
  d3.csv("./data/weekly_temperature.csv", d3.autoType),
  d3.csv("./data/weekly_temperature_mobile.csv", d3.autoType)
]).then(data => {
  console.log("temperature data", data);

  desktopData = data[0];
  mobileData = data[1];

  let chartData;
  if (window.innerWidth >= 700) {
    chartData = desktopData;
  } else {
    chartData = mobileData;
  }
  
  drawLineChart(chartData);
  createTooltip();
  handleMouseEvents();
});