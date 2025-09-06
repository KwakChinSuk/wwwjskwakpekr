
const urlParams = new URLSearchParams(window.location.search);
var uidcnt =  urlParams.get('uidcnt');
var kind =  urlParams.get('kind');

if (kind == 5 ){
    padding1 = 0
}else if (kind == 1 ){
    padding1 = 30
}else{
    if (uidcnt < 10 ){
        padding1 = 30
    }else  if (uidcnt < 20 ){
        padding1 = 20
    }else  if (uidcnt < 30 ){
        padding1 = 10
    }else  {
        padding1 = 0
    };
}

console.log(padding1);

function _key(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(d3,width,data,forceCollide,drag,invalidation)
{
  // Specify the dimensions of the chart.
  //const width = 300;
  const height = 800;  // KJS
  const margin = 0; // to avoid clipping the root circle stroke
  const name = d => d.id; // "Strings" of "flare.util.Strings"
  const group = d => d.group; // "util" of "flare.util.Strings"
  const names = d => name(d).split(/(?=[A-Z][a-z])|\s+/g); // ["Legend", "Item"] of "flare.vis.legend.LegendItems"

  // Specify the number format for values.
  const format = d3.format(",d");

  // Create a categorical color scale.
  const color = d3.scaleOrdinal(d3.schemeTableau10);

  var sizeScale = d3.scaleSqrt().range([0,1.8]);

  // Create the pack layout.
  const pack = d3.pack()
      .size([width, height]) // [width - (margin * 2), height - (margin * 2)])
      .radius(d=>sizeScale(d.value))
      .padding(1);

  // Compute the hierarchy from the (flat) data; expose the values
  // for each node; lastly apply the pack layout.
  // KJS  그룹 개수 1ea : data[0] ,2ea : data[0],data[1]

  if (kind == 5 ){
          console.log("d5");
          root = pack(d3.hierarchy({children: [{children: data[0]}, {children: data[1]}, {children: data[2]}, {children: data[3]}, {children: data[4]} ]}).sum(d => d.value));
    }else{
          console.log("d1");
          root = pack(d3.hierarchy({children: [{children: data[0]} ]})
            .sum(d => d.value));
    }


  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      //.attr("viewBox", [-margin, -margin, width, height])
      .attr("style", "max-width: 100%;  font: 12px sans-serif;") //  KJS
      .attr("text-anchor", "middle");

  const nodes = root.leaves();

  const simulation = d3.forceSimulation(nodes)
    .force("x", d3.forceX(width / 2).strength(0.01))
    .force("y", d3.forceY(height / 2).strength(0.01))
    .force("collide", forceCollide());

  // Place each (leaf) node according to the layout’s x and y values.
  const node = svg.append("g")
    .selectAll()
    .data(nodes)
    .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .call(drag(simulation));

  // Add a title.
  node.append("title")
      .text(d => `${d.data.id}\n ${format(d.data.a)}/${format(d.data.m)}/${format(d.data.p)} (GAID/MID/PageView)`);

  // Add a filled circle.
  const circle = node.append("circle")
      .attr("fill-opacity", 0.7)
      .attr("fill", d => color(group(d.data)))
      // .attr("cx", d => d.x)
      // .attr("cy", d => d.y)
      // .call(drag(simulation));
      // .attr("r", d => d.r);

  // Add a label.
  const textLabel = node.append("text")
      // .attr("clip-path", d => `circle(${d.r})`)
      .text( function(d){
        //console.log(d.data.id);
        return d.data.id
        }
      )
      .on("click", function(e, i) {
            //pgroup = e.srcElement.nextSibling.lastChild.parentElement.__data__.data.group;
            //pid = e.srcElement.nextSibling.lastChild.parentElement.__data__.data.id;
            //console.log(pid);
            //console.log(pgroup);
            //console.log(e.srcElement.nextSibling.lastChild.parentElement.__data__.data.value);
            //console.log(window.location.search);
            //console.log(getpath('ppath'))
            //const tag = urlParameter.get('ppath');
            //console.log(tag);

            //location.href="?ppath="+pid;
        })
      .style('cursor', 'pointer')
      .attr("opacity", 10);

//console.log(nodes);
  // Add a tspan for each CamelCase-separated word.
  const text = textLabel.selectAll()
    .data(d => names(d.data))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.35}em`)
      .attr("fill-opacity", 0.8)
      .attr("style", "display: block;  width: 1000px;  overflow: hidden;  white-space: nowrap;  text-overflow: ellipsis")

      .on("click", function(e, i) {
            //pgroup = e.srcElement.nextSibling.lastChild.parentElement.__data__.data.group;
            //pid = e.srcElement.nextSibling.lastChild.parentElement.__data__.data.id;
            //console.log(pid);
            //console.log(pgroup);
            //console.log(e.srcElement.nextSibling.lastChild.parentElement.__data__.data.value);
            //console.log(window.location.search);
            //console.log(getpath('ppath'))
            //const tag = urlParameter.get('ppath');
            //console.log(tag);

            //location.href="?ppath="+pid;
        })
      .style('cursor', 'pointer')
      //.text(d => d); /// JSK  라벨

  // Add a tspan for the node’s value.
  const textValue = textLabel.append("tspan")
      .attr("x", 0)
      .attr("y", d => `${names(d.data).length / 2 + 0.35}em`)
      .attr("fill-opacity", 0.6)
      .attr("fill", "#FF0000")
      .text(d => format(d.value)); /// JSK  라벨 값

  circle.transition()
      .delay((d, i) => Math.random() * 500)
      .duration(750)
      .attrTween("r", d => {
        const i = d3.interpolate(0, d.r);
        return t => d.r = i(t);
      });

  textLabel.transition()
    .delay((d, i) => Math.random() * 500)
    .duration(1500)
    .attr("opacity", 1)

  simulation.on("tick", () => {
    node
      .attr("transform", d => `translate(${d.x},${d.y})`)

  });

  invalidation.then(() => simulation.stop());
  return Object.assign(svg.node(), {scales: {color}});
}


function _forceCollide(d3){
    return(
        function forceCollide() {
          const alpha = 0.1; // fixed for greater rigidity!
          //const padding1 = 30; // KJS  간격 separation between same-color nodes
          const padding2 = 30; // separation between different-color nodes
          let nodes;
          let maxRadius;

          function force() {
            const quadtree = d3.quadtree(nodes, d => d.x, d => d.y);
            for (const d of nodes) {
              const r = d.r + maxRadius;
              const nx1 = d.x - r, ny1 = d.y - r;
              const nx2 = d.x + r, ny2 = d.y + r;
              quadtree.visit((q, x1, y1, x2, y2) => {
                if (!q.length) do {
                  if (q.data !== d) {
                    const r = d.r + q.data.r + (d.data.group === q.data.data.group ? padding1 : padding2);
                    let x = d.x - q.data.x, y = d.y - q.data.y, l = Math.hypot(x, y);
                    if (l < r) {
                      l = (l - r) / l * alpha;
                      d.x -= x *= l, d.y -= y *= l;
                      q.data.x += x, q.data.y += y;
                    }
                  }
                } while (q = q.next);
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
              });
            }
          }
          force.initialize = _ => maxRadius = d3.max(nodes = _, d => d.r) + Math.max(padding1, padding2);
          return force;
        }
    )
}

function _drag(d3){return(
simulation => {

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}
)}


function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["d3","width","data","forceCollide","drag","invalidation"], _chart);
  main.variable(observer("forceCollide")).define("forceCollide", ["d3"], _forceCollide);
  main.variable(observer("drag")).define("drag", ["d3"], _drag);
  main.variable(observer("data")).define("data", _data);
  main.variable(observer("Swatches")).define("Swatches", ["d3","htl"], _Swatches);

  return main;
}


function _Legend(d3){return(
function Legend(color, {
  title,
  tickSize = 60,
  width = 320,
  height = 44 + tickSize,
  marginTop = 0,
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
    const context = canvas.getContext("d");
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
      //.style("font-size","0px")
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
        ///.style("font-size","0px")
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
        ///.style("font-size","0px")
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
        ///.style("font-size","0px")
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
        ///.style("font-size","0px")
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
        ///.style("font-size","0px")
        .text(title));

  return svg.node();
}
)}



// KJS 제목
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
      <div class=${id}-swatch style=${{background: color(value)}}>0000</div>
      <div class=${id}-label title=${label}>${label}0000</div>
    </div>`;
  })}
  </div>
</div>`;

  return htl.html`<div style="display: flex; align-items: center; min-height: 33px; margin-left: ${+marginLeft}px; font: 20px sans-serif;">
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
                  margin-right: 0.1em;
                  background: var(--color);
                }
                  </style>

                  <div>${domain.map(value => htl.html`<span class="${id}" style="--color: ${color(value)}">${format(value)}</span>`)}</div>`;
}
)}

function getpath(par){
    const urlParameter = new URLSearchParams(window.location.search);
    const entries   = urlParameter.entries();
    for(const key of entries) {
        if (par = key[0])
        {
            return key[1];
        }
    }
}


