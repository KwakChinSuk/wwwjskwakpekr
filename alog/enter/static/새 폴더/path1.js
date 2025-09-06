

function _key(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(d3,data)
{
  // Specify the dimensions of the chart.
  const width = 928;
  const height = width;
  const margin = 1; // to avoid clipping the root circle stroke
  const name = d => d.id.split(".").pop(); // "Strings" of "flare.util.Strings"
  const group = d => d.id.split(".")[1]; // "util" of "flare.util.Strings"
  const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

  // Specify the number format for values.
  const format = d3.format(",d");

  // Create a categorical color scale.
  const color = d3.scaleOrdinal(d3.schemeTableau10);

  // Create the pack layout.
  const pack = d3.pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(3);

  // Compute the hierarchy from the (flat) data; expose the values
  // for each node; lastly apply the pack layout.
  const root = pack(d3.hierarchy({children: data})
      .sum(d => d.value));

  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;")
      .attr("text-anchor", "middle");

  // Place each (leaf) node according to the layout’s x and y values.
  const node = svg.append("g")
    .selectAll()
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

  // Add a title.
  node.append("title")
      .text(d => `${d.data.id}\n${format(d.value)}`);

  // Add a filled circle.
  node.append("circle")
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(group(d.data)))
      .attr("r", d => d.r);

  // Add a label.
  const text = node.append("text")
      .attr("clip-path", d => `circle(${d.r})`);

  // Add a tspan for each CamelCase-separated word.
  text.selectAll()
    .data(d => names(d.data))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
      .text(d => d);

  // Add a tspan for the node’s value.
  text.append("tspan")
      .attr("x", 0)
      .attr("y", d => `${names(d.data).length / 2 + 0.35}em`)
      .attr("fill-opacity", 0.7)
      .text(d => format(d.value));

  return Object.assign(svg.node(), {scales: {color}});
}


function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Color legend</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Color legend

A simple legend for a [color scale](/@d3/color-schemes). Supports [continuous](/@d3/continuous-scales), [sequential](/@d3/sequential-scales), [diverging](/@d3/diverging-scales), [quantize, quantile, threshold](/@d3/quantile-quantize-and-threshold-scales) and [ordinal](/@d3/d3-scaleordinal) scales. To use:

~~~js
import {Legend, Swatches} from "@d3/color-legend"
~~~

Then call the legend function as shown below. (For ordinal scales, also consider the swatches function.)`
)}

function _2(Legend,d3){return(
Legend(d3.scaleSequential([0, 100], d3.interpolateViridis), {
  title: "Temperature (°F)"
})
)}

function _3(Legend,d3){return(
Legend(d3.scaleSequentialSqrt([0, 1], d3.interpolateTurbo), {
  title: "Speed (kts)"
})
)}

function _4(Legend,d3){return(
Legend(d3.scaleDiverging([-0.1, 0, 0.1], d3.interpolatePiYG), {
  title: "Daily change",
  tickFormat: "+%"
})
)}

function _5(Legend,d3){return(
Legend(d3.scaleDivergingSqrt([-0.1, 0, 0.1], d3.interpolateRdBu), {
  title: "Daily change",
  tickFormat: "+%"
})
)}

function _6(Legend,d3){return(
Legend(d3.scaleSequentialLog([1, 100], d3.interpolateBlues), {
  title: "Energy (joules)",
  ticks: 10
})
)}

function _7(Legend,d3){return(
Legend(d3.scaleSequentialQuantile(d3.range(100).map(() => Math.random() ** 2), d3.interpolateBlues), {
  title: "Quantile",
  tickFormat: ".2f"
})
)}

function _8(Legend,d3){return(
Legend(d3.scaleSqrt([-100, 0, 100], ["blue", "white", "red"]), {
  title: "Temperature (°C)"
})
)}

function _9(Legend,d3){return(
Legend(d3.scaleQuantize([1, 10], d3.schemePurples[9]), {
  title: "Unemployment rate (%)"
})
)}

function _10(Legend,d3){return(
Legend(d3.scaleQuantile(d3.range(1000).map(d3.randomNormal(100, 20)), d3.schemeSpectral[9]), {
  title: "Height (cm)",
  tickFormat: ".0f"
})
)}

function _11(Legend,d3){return(
Legend(d3.scaleThreshold([2.5, 3.1, 3.5, 3.9, 6, 7, 8, 9.5], d3.schemeRdBu[9]), {
  title: "Unemployment rate (%)",
  tickSize: 0
})
)}

function _12(Legend,d3){return(
Legend(d3.scaleOrdinal(["<10", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "≥80"], d3.schemeSpectral[10]), {
  title: "Age (years)",
  tickSize: 0
})
)}

function _13(md){return(
md`But wait, there’s more!

How about swatches for ordinal color scales? Both variable-width swatches and [column layout](https://developer.mozilla.org/en-US/docs/Web/CSS/columns) are supported.`
)}

function _14(Swatches,d3){return(
Swatches(d3.scaleOrdinal(["blueberries", "oranges", "apples"], d3.schemeCategory10))
)}

function _15(Swatches,d3){return(
Swatches(d3.scaleOrdinal(["Wholesale and Retail Trade", "Manufacturing", "Leisure and hospitality", "Business services", "Construction", "Education and Health", "Government", "Finance", "Self-employed", "Other"], d3.schemeTableau10), {
  columns: "180px"
})
)}

function _16(md){return(
md`---

## Implementation`
)}


function _Legend(d3){return(
function Legend(color, {
  title,
  tickSize = 6,
  width = 320,
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
  ticks = width / 64,
  tickFormat,
  tickValues
} = {}) {

  function ramp(color, n = 256) {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
      context.fillStyle = color(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("overflow", "visible")
      .style("display", "block");

  let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
  let x;

  // Continuous
  if (color.interpolate) {
    const n = Math.min(color.domain().length, color.range().length);

    x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
  }

  // Sequential
  else if (color.interpolator) {
    x = Object.assign(color.copy()
        .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
        {range() { return [marginLeft, width - marginRight]; }});

    svg.append("image")
        .attr("x", marginLeft)
        .attr("y", marginTop)
        .attr("width", width - marginLeft - marginRight)
        .attr("height", height - marginTop - marginBottom)
        .attr("preserveAspectRatio", "none")
        .attr("xlink:href", ramp(color.interpolator()).toDataURL());

    // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
    if (!x.ticks) {
      if (tickValues === undefined) {
        const n = Math.round(ticks + 1);
        tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
      }
      if (typeof tickFormat !== "function") {
        tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
      }
    }
  }

  // Threshold
  else if (color.invertExtent) {
    const thresholds
        = color.thresholds ? color.thresholds() // scaleQuantize
        : color.quantiles ? color.quantiles() // scaleQuantile
        : color.domain(); // scaleThreshold

    const thresholdFormat
        = tickFormat === undefined ? d => d
        : typeof tickFormat === "string" ? d3.format(tickFormat)
        : tickFormat;

    x = d3.scaleLinear()
        .domain([-1, color.range().length - 1])
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
        .attr("x", (d, i) => x(i - 1))
        .attr("y", marginTop)
        .attr("width", (d, i) => x(i) - x(i - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", d => d);

    tickValues = d3.range(thresholds.length);
    tickFormat = i => thresholdFormat(thresholds[i], i);
  }

  // Ordinal
  else {
    x = d3.scaleBand()
        .domain(color.domain())
        .rangeRound([marginLeft, width - marginRight]);

    svg.append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
        .attr("x", x)
        .attr("y", marginTop)
        .attr("width", Math.max(0, x.bandwidth() - 1))
        .attr("height", height - marginTop - marginBottom)
        .attr("fill", color);

    tickAdjust = () => {};
  }

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
        .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
        .tickSize(tickSize)
        .tickValues(tickValues))
      .call(tickAdjust)
      .call(g => g.select(".domain").remove())
      .call(g => g.append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .attr("class", "title")
        .text(title));

  return svg.node();
}
)}


function _legend(Legend){return(
function legend({color, ...options}) {
  return Legend(color, options);
}
)}



function _Swatches(d3,htl){return(
function Swatches(color, {
  columns = null,
  format,
  unknown: formatUnknown,
  swatchSize = 15,
  swatchWidth = swatchSize,
  swatchHeight = swatchSize,
  marginLeft = 0
} = {}) {
  const id = `-swatches-${Math.random().toString(16).slice(2)}`;
  const unknown = formatUnknown == null ? undefined : color.unknown();
  const unknowns = unknown == null || unknown === d3.scaleImplicit ? [] : [unknown];
  const domain = color.domain().concat(unknowns);
  if (format === undefined) format = x => x === unknown ? formatUnknown : x;

  function entity(character) {
    return `&#${character.charCodeAt(0).toString()};`;
  }

  if (columns !== null) return htl.html`<div style="display: flex; align-items: center; margin-left: ${+marginLeft}px; min-height: 33px; font: 10px sans-serif;">
  <style>

.${id}-item {
  break-inside: avoid;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
}

.${id}-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - ${+swatchWidth}px - 0.5em);
}

.${id}-swatch {
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin: 0 0.5em 0 0;
}

  </style>
  <div style=${{width: "100%", columns}}>${domain.map(value => {
    const label = `${format(value)}`;
    return htl.html`<div class=${id}-item>
      <div class=${id}-swatch style=${{background: color(value)}}></div>
      <div class=${id}-label title=${label}>${label}</div>
    </div>`;
  })}
  </div>
</div>`;

  return htl.html`<div style="display: flex; align-items: center; min-height: 33px; margin-left: ${+marginLeft}px; font: 10px sans-serif;">
  <style>

.${id} {
  display: inline-flex;
  align-items: center;
  margin-right: 1em;
}

.${id}::before {
  content: "";
  width: ${+swatchWidth}px;
  height: ${+swatchHeight}px;
  margin-right: 0.5em;
  background: var(--color);
}

  </style>
  <div>${domain.map(value => htl.html`<span class="${id}" style="--color: ${color(value)}">${format(value)}</span>`)}</div>`;
}
)}

function _swatches(Swatches){return(
function swatches({color, ...options}) {
  return Swatches(color, options);
}
)}

function define1(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["Legend","d3"], _2);
  main.variable(observer()).define(["Legend","d3"], _3);
  main.variable(observer()).define(["Legend","d3"], _4);
  main.variable(observer()).define(["Legend","d3"], _5);
  main.variable(observer()).define(["Legend","d3"], _6);
  main.variable(observer()).define(["Legend","d3"], _7);
  main.variable(observer()).define(["Legend","d3"], _8);
  main.variable(observer()).define(["Legend","d3"], _9);
  main.variable(observer()).define(["Legend","d3"], _10);
  main.variable(observer()).define(["Legend","d3"], _11);
  main.variable(observer()).define(["Legend","d3"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["Swatches","d3"], _14);
  main.variable(observer()).define(["Swatches","d3"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("Legend")).define("Legend", ["d3"], _Legend);
  main.variable(observer("legend")).define("legend", ["Legend"], _legend);
  main.variable(observer("Swatches")).define("Swatches", ["d3","htl"], _Swatches);
  main.variable(observer("swatches")).define("swatches", ["Swatches"], _swatches);
  return main;
}


export default function define(runtime, observer) {
  var jdata1 = [{"id":"flare.analytics.cluster.AgglomerativeCluster","value":3938},{"id":"flare.analytics.cluster.CommunityStructure","value":3812},{"id":"flare.analytics.cluster.HierarchicalCluster","value":6714},{"id":"flare.analytics.cluster.MergeEdge","value":743},{"id":"flare.analytics.graph.BetweennessCentrality","value":3534},{"id":"flare.analytics.graph.LinkDistance","value":5731},{"id":"flare.analytics.graph.MaxFlowMinCut","value":7840},{"id":"flare.analytics.graph.ShortestPaths","value":5914},{"id":"flare.analytics.graph.SpanningTree","value":3416},{"id":"flare.analytics.optimization.AspectRatioBanker","value":7074},{"id":"flare.animate.Easing","value":17010},{"id":"flare.animate.FunctionSequence","value":5842},{"id":"flare.animate.interpolate.ArrayInterpolator","value":1983},{"id":"flare.animate.interpolate.ColorInterpolator","value":2047},{"id":"flare.animate.interpolate.DateInterpolator","value":1375},{"id":"flare.animate.interpolate.Interpolator","value":8746},{"id":"flare.animate.interpolate.MatrixInterpolator","value":2202},{"id":"flare.animate.interpolate.NumberInterpolator","value":1382},{"id":"flare.animate.interpolate.ObjectInterpolator","value":1629},{"id":"flare.animate.interpolate.PointInterpolator","value":1675},{"id":"flare.animate.interpolate.RectangleInterpolator","value":2042},{"id":"flare.animate.ISchedulable","value":1041},{"id":"flare.animate.Parallel","value":5176},{"id":"flare.animate.Pause","value":449},{"id":"flare.animate.Scheduler","value":5593},{"id":"flare.animate.Sequence","value":5534},{"id":"flare.animate.Transition","value":9201},{"id":"flare.animate.Transitioner","value":19975},{"id":"flare.animate.TransitionEvent","value":1116},{"id":"flare.animate.Tween","value":6006},{"id":"flare.data.converters.Converters","value":721},{"id":"flare.data.converters.DelimitedTextConverter","value":4294},{"id":"flare.data.converters.GraphMLConverter","value":9800},{"id":"flare.data.converters.IDataConverter","value":1314},{"id":"flare.data.converters.JSONConverter","value":2220},{"id":"flare.data.DataField","value":1759},{"id":"flare.data.DataSchema","value":2165},{"id":"flare.data.DataSet","value":586},{"id":"flare.data.DataSource","value":3331},{"id":"flare.data.DataTable","value":772},{"id":"flare.data.DataUtil","value":3322},{"id":"flare.display.DirtySprite","value":8833},{"id":"flare.display.LineSprite","value":1732},{"id":"flare.display.RectSprite","value":3623},{"id":"flare.display.TextSprite","value":10066},{"id":"flare.flex.FlareVis","value":4116},{"id":"flare.physics.DragForce","value":1082},{"id":"flare.physics.GravityForce","value":1336},{"id":"flare.physics.IForce","value":319},{"id":"flare.physics.NBodyForce","value":10498},{"id":"flare.physics.Particle","value":2822},{"id":"flare.physics.Simulation","value":9983},{"id":"flare.physics.Spring","value":2213},{"id":"flare.physics.SpringForce","value":1681},{"id":"flare.query.AggregateExpression","value":1616},{"id":"flare.query.And","value":1027},{"id":"flare.query.Arithmetic","value":3891},{"id":"flare.query.Average","value":891},{"id":"flare.query.BinaryExpression","value":2893},{"id":"flare.query.Comparison","value":5103},{"id":"flare.query.CompositeExpression","value":3677},{"id":"flare.query.Count","value":781},{"id":"flare.query.DateUtil","value":4141},{"id":"flare.query.Distinct","value":933},{"id":"flare.query.Expression","value":5130},{"id":"flare.query.ExpressionIterator","value":3617},{"id":"flare.query.Fn","value":3240},{"id":"flare.query.If","value":2732},{"id":"flare.query.IsA","value":2039},{"id":"flare.query.Literal","value":1214},{"id":"flare.query.Match","value":3748},{"id":"flare.query.Maximum","value":843},{"id":"flare.query.methods.add","value":593},{"id":"flare.query.methods.and","value":330},{"id":"flare.query.methods.average","value":287},{"id":"flare.query.methods.count","value":277},{"id":"flare.query.methods.distinct","value":292},{"id":"flare.query.methods.div","value":595},{"id":"flare.query.methods.eq","value":594},{"id":"flare.query.methods.fn","value":460},{"id":"flare.query.methods.gt","value":603},{"id":"flare.query.methods.gte","value":625},{"id":"flare.query.methods.iff","value":748},{"id":"flare.query.methods.isa","value":461},{"id":"flare.query.methods.lt","value":597},{"id":"flare.query.methods.lte","value":619},{"id":"flare.query.methods.max","value":283},{"id":"flare.query.methods.min","value":283},{"id":"flare.query.methods.mod","value":591},{"id":"flare.query.methods.mul","value":603},{"id":"flare.query.methods.neq","value":599},{"id":"flare.query.methods.not","value":386},{"id":"flare.query.methods.or","value":323},{"id":"flare.query.methods.orderby","value":307},{"id":"flare.query.methods.range","value":772},{"id":"flare.query.methods.select","value":296},{"id":"flare.query.methods.stddev","value":363},{"id":"flare.query.methods.sub","value":600},{"id":"flare.query.methods.sum","value":280},{"id":"flare.query.methods.update","value":307},{"id":"flare.query.methods.variance","value":335},{"id":"flare.query.methods.where","value":299},{"id":"flare.query.methods.xor","value":354},{"id":"flare.query.methods._","value":264},{"id":"flare.query.Minimum","value":843},{"id":"flare.query.Not","value":1554},{"id":"flare.query.Or","value":970},{"id":"flare.query.Query","value":13896},{"id":"flare.query.Range","value":1594},{"id":"flare.query.StringUtil","value":4130},{"id":"flare.query.Sum","value":791},{"id":"flare.query.Variable","value":1124},{"id":"flare.query.Variance","value":1876},{"id":"flare.query.Xor","value":1101},{"id":"flare.scale.IScaleMap","value":2105},{"id":"flare.scale.LinearScale","value":1316},{"id":"flare.scale.LogScale","value":3151},{"id":"flare.scale.OrdinalScale","value":3770},{"id":"flare.scale.QuantileScale","value":2435},{"id":"flare.scale.QuantitativeScale","value":4839},{"id":"flare.scale.RootScale","value":1756},{"id":"flare.scale.Scale","value":4268},{"id":"flare.scale.ScaleType","value":1821},{"id":"flare.scale.TimeScale","value":5833},{"id":"flare.util.Arrays","value":8258},{"id":"flare.util.Colors","value":10001},{"id":"flare.util.Dates","value":8217},{"id":"flare.util.Displays","value":12555},{"id":"flare.util.Filter","value":2324},{"id":"flare.util.Geometry","value":10993},{"id":"flare.util.heap.FibonacciHeap","value":9354},{"id":"flare.util.heap.HeapNode","value":1233},{"id":"flare.util.IEvaluable","value":335},{"id":"flare.util.IPredicate","value":383},{"id":"flare.util.IValueProxy","value":874},{"id":"flare.util.math.DenseMatrix","value":3165},{"id":"flare.util.math.IMatrix","value":2815},{"id":"flare.util.math.SparseMatrix","value":3366},{"id":"flare.util.Maths","value":17705},{"id":"flare.util.Orientation","value":1486},{"id":"flare.util.palette.ColorPalette","value":6367},{"id":"flare.util.palette.Palette","value":1229},{"id":"flare.util.palette.ShapePalette","value":2059},{"id":"flare.util.palette.SizePalette","value":2291},{"id":"flare.util.Property","value":5559},{"id":"flare.util.Shapes","value":19118},{"id":"flare.util.Sort","value":6887},{"id":"flare.util.Stats","value":6557},{"id":"flare.util.Strings","value":22026},{"id":"flare.vis.axis.Axes","value":1302},{"id":"flare.vis.axis.Axis","value":24593},{"id":"flare.vis.axis.AxisGridLine","value":652},{"id":"flare.vis.axis.AxisLabel","value":636},{"id":"flare.vis.axis.CartesianAxes","value":6703},{"id":"flare.vis.controls.AnchorControl","value":2138},{"id":"flare.vis.controls.ClickControl","value":3824},{"id":"flare.vis.controls.Control","value":1353},{"id":"flare.vis.controls.ControlList","value":4665},{"id":"flare.vis.controls.DragControl","value":2649},{"id":"flare.vis.controls.ExpandControl","value":2832},{"id":"flare.vis.controls.HoverControl","value":4896},{"id":"flare.vis.controls.IControl","value":763},{"id":"flare.vis.controls.PanZoomControl","value":5222},{"id":"flare.vis.controls.SelectionControl","value":7862},{"id":"flare.vis.controls.TooltipControl","value":8435},{"id":"flare.vis.data.Data","value":20544},{"id":"flare.vis.data.DataList","value":19788},{"id":"flare.vis.data.DataSprite","value":10349},{"id":"flare.vis.data.EdgeSprite","value":3301},{"id":"flare.vis.data.NodeSprite","value":19382},{"id":"flare.vis.data.render.ArrowType","value":698},{"id":"flare.vis.data.render.EdgeRenderer","value":5569},{"id":"flare.vis.data.render.IRenderer","value":353},{"id":"flare.vis.data.render.ShapeRenderer","value":2247},{"id":"flare.vis.data.ScaleBinding","value":11275},{"id":"flare.vis.data.Tree","value":7147},{"id":"flare.vis.data.TreeBuilder","value":9930},{"id":"flare.vis.events.DataEvent","value":2313},{"id":"flare.vis.events.SelectionEvent","value":1880},{"id":"flare.vis.events.TooltipEvent","value":1701},{"id":"flare.vis.events.VisualizationEvent","value":1117},{"id":"flare.vis.legend.Legend","value":20859},{"id":"flare.vis.legend.LegendItem","value":4614},{"id":"flare.vis.legend.LegendRange","value":10530},{"id":"flare.vis.operator.distortion.BifocalDistortion","value":4461},{"id":"flare.vis.operator.distortion.Distortion","value":6314},{"id":"flare.vis.operator.distortion.FisheyeDistortion","value":3444},{"id":"flare.vis.operator.encoder.ColorEncoder","value":3179},{"id":"flare.vis.operator.encoder.Encoder","value":4060},{"id":"flare.vis.operator.encoder.PropertyEncoder","value":4138},{"id":"flare.vis.operator.encoder.ShapeEncoder","value":1690},{"id":"flare.vis.operator.encoder.SizeEncoder","value":1830},{"id":"flare.vis.operator.filter.FisheyeTreeFilter","value":5219},{"id":"flare.vis.operator.filter.GraphDistanceFilter","value":3165},{"id":"flare.vis.operator.filter.VisibilityFilter","value":3509},{"id":"flare.vis.operator.IOperator","value":1286},{"id":"flare.vis.operator.label.Labeler","value":9956},{"id":"flare.vis.operator.label.RadialLabeler","value":3899},{"id":"flare.vis.operator.label.StackedAreaLabeler","value":3202},{"id":"flare.vis.operator.layout.AxisLayout","value":6725},{"id":"flare.vis.operator.layout.BundledEdgeRouter","value":3727},{"id":"flare.vis.operator.layout.CircleLayout","value":9317},{"id":"flare.vis.operator.layout.CirclePackingLayout","value":12003},{"id":"flare.vis.operator.layout.DendrogramLayout","value":4853},{"id":"flare.vis.operator.layout.ForceDirectedLayout","value":8411},{"id":"flare.vis.operator.layout.IcicleTreeLayout","value":4864},{"id":"flare.vis.operator.layout.IndentedTreeLayout","value":3174},{"id":"flare.vis.operator.layout.Layout","value":7881},{"id":"flare.vis.operator.layout.NodeLinkTreeLayout","value":12870},{"id":"flare.vis.operator.layout.PieLayout","value":2728},{"id":"flare.vis.operator.layout.RadialTreeLayout","value":12348},{"id":"flare.vis.operator.layout.RandomLayout","value":870},{"id":"flare.vis.operator.layout.StackedAreaLayout","value":9121},{"id":"flare.vis.operator.layout.TreeMapLayout","value":9191},{"id":"flare.vis.operator.Operator","value":2490},{"id":"flare.vis.operator.OperatorList","value":5248},{"id":"flare.vis.operator.OperatorSequence","value":4190},{"id":"flare.vis.operator.OperatorSwitch","value":2581},{"id":"flare.vis.operator.SortOperator","value":2023},{"id":"flare.vis.Visualization","value":16540}]

  //console.log(jdata1);
  //console.log(jdata);
  //console.log(_data);

  const main = runtime.module();
  function toString() { return this.url; }
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","data"], _chart);
  main.variable(observer("data")).define("data", ["FileAttachment"], jdata1);

  const child1 = runtime.module(define1);
  main.import("Swatches", child1);
  return main;
}
