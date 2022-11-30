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
    .ticks(windowWidth / 120);
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

  // Move Annotations
  const maxAnnotationIndex = getMaxAnnotationIndex();
  d3.select(".annotation-max")
    .attr("x", xScale(data[data.length - maxAnnotationIndex].date) + 13)
    .attr("y", yScale(data[data.length - maxAnnotationIndex].max_temp_F) - 20);
  d3.select(".annotation-line-max")
    .attr("x1", xScale(data[data.length - maxAnnotationIndex].date))
    .attr("y1", yScale(data[data.length - maxAnnotationIndex].max_temp_F) - 3)
    .attr("x2", xScale(data[data.length - maxAnnotationIndex].date) + 10)
    .attr("y2", yScale(data[data.length - maxAnnotationIndex].max_temp_F) - 20);

  const minAnnotationIndex = getMinAnnotationIndex();
  d3.select(".annotation-min")
    .attr("x", xScale(data[data.length - minAnnotationIndex].date) + 13)
    .attr("y", yScale(data[data.length - minAnnotationIndex].min_temp_F) + 20);
  d3.select(".annotation-line-min")
    .attr("x1", xScale(data[data.length - minAnnotationIndex].date))
    .attr("y1", yScale(data[data.length - minAnnotationIndex].min_temp_F) + 3)
    .attr("x2", xScale(data[data.length - minAnnotationIndex].date) + 10)
    .attr("y2", yScale(data[data.length - minAnnotationIndex].min_temp_F) + 20);
}