const getWindowWidth = () => {
  return window.innerWidth;
};
let windowWidth = getWindowWidth();
let isDesktopLayout = windowWidth >= 700 ? true : false;

window.addEventListener("resize", () => {
  windowWidth = getWindowWidth();
  resizeChart();
});

const resizeChart = () => {

  // Adapt the number of ticks on the y-axis
  leftAxis
    // .ticks(windowWidth / 110);
    .ticks(isDesktopLayout ? 10 : 5);
  d3.select(".axis-y")
    .transition()
    .call(leftAxis);

  // Update text size
  d3.selectAll(".axis-main-label, .annotation, .axis-x text, .axis-y text")
    .style("font-size", `${fontSizeScale(windowWidth)}px`);

  // Update density of data points
  if ((windowWidth >= 700 && !isDesktopLayout) ||
      (windowWidth < 700 && isDesktopLayout)) {
    isDesktopLayout = !isDesktopLayout;
    updateData();
  }
};

const updateData = () => {
  const data = isDesktopLayout ? desktopData : mobileData;

  // Update area
  d3.select(".temperature-area")
    // .transition()
    .attr("d", areaGenerator(data));

  // Update curve
  d3.select(".temperature-curve")
    // .transition()
    .attr("d", curveGenerator(data));
  
  // Update circles
  d3.select(".inner-chart")
    .selectAll("circle")
    .data(data)
    .join("circle")
    // .transition()
      .attr("r", isDesktopLayout ? 5 : 8)
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.avg_temp_F))
      .attr("fill", aubergine);

}