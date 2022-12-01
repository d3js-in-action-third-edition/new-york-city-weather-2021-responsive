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
  margin.right = isDesktopLayout ? 250 : 10;
  innerWidth = width - margin.left - margin.right;

  // Update xScale
  xScale.range([0, innerWidth]);

  // Update x-axis
  bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.timeFormat("%b"));
  d3.select(".axis-x")
    .call(bottomAxis);
  d3.selectAll(".axis-x text")
    .attr("x", d => {
       const currentMonth = d;
       const nextMonth = new Date(2021, currentMonth.getMonth() + 1, 1);
       return (xScale(nextMonth) - xScale(currentMonth)) / 2;
    })
    .attr("y", "10px");

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

  if (isDesktopLayout) {
    appendAnnotations(data, xScale, yScale);
  } else {
    removeAnnotations();
  }

}