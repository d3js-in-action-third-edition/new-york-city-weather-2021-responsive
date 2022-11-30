// Chart
const margin = {top: 45, right: 250, bottom: 35, left: 45};
const width = 1000;
const height = 500;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const aubergine = "#75485E";
let innerChart;

// Tooltip
const tooltipWidth = 65;
const tooltipHeight = 32;

// Font size scale
let xScale = d3.scaleTime();
let yScale = d3.scaleLinear();
const fontSizeScale = d3.scaleLinear()
  .domain([600, 1000])
  .range([26, 16])
  .clamp(true);

let leftAxis;
const curveGenerator = d3.line();
const areaGenerator = d3.area();

let desktopData;
let mobileData;

const getMaxAnnotationIndex = () => {
  return isDesktopLayout ? 4 : 5;
};
const getMinAnnotationIndex = () => {
  return isDesktopLayout ? 3 : 2;
};