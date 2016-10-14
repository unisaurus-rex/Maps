export function initTooltip() {
  d3.select("body")
    .append('div')
    .classed('hidden', true)
    .classed('mapTooltip', true);
}

// tooltipCenter is array[how far right, how far down]
export function positionTooltip(tooltipCenter) {
  d3.select('.mapTooltip')
    .classed('hidden', false)
    .style('left', tooltipCenter[0] + "px")
    .style('top', tooltipCenter[1] + "px");
}

export function hideTooltip(){
  d3.select('.mapTooltip').classed('hidden', true);
}

export function addTooltipHTML(htmlStr){
  d3.select('.mapTooltip').html(htmlStr);
}
