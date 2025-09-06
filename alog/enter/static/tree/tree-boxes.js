/***************************************************************
 *
 *  Copyright (C) 2016 Swayvil <swayvil@gmail.com>
 *
 *  This program is free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details.
 *
 ***************************************************************/

/*
 * Dependencies:
 * - d3.js
 * - jquery.js
 */
"use strict";

function treeBoxes(urlService, jsonData)
{
	var urlService_ = '';
	
	var blue = '#337ab7',
		green = '#5cb85c',
		yellow = '#f0ad4e',
		blueText = '#4ab1eb',
		purple = '#9467bd';

	var t9 = '#FF0000',
	t8 = '#FF0000',
	t7 = '#FF0000',
	t6 = '#FF0000',
	t5 = '#f1948a',
	t4 = '#0000FF',
	t3 = '#03a9f4',
	t2 = '#58d68d',
	t1 = '#000000',
	ta = '#566573',
	t0 = '#d0d3d4'

	var margin = {
					top : 0,
					right : 0,
					bottom : 100,
					left : 0
				 },
		// Height and width are redefined later in function of the size of the tree
		// (after that the data are loaded)
		width = 1000 - margin.right - margin.left,
		height = 600 - margin.top - margin.bottom;

	var rectNode = { width : 230, height : 50, textMargin : 1 },
		tooltip = { width : 0, height : 0, textMargin : 0 };

	var i = 0,
		duration = 750,
		root;

	var mousedown; // Use to save temporarily 'mousedown.zoom' value
	var mouseWheel,
		mouseWheelName,
		isKeydownZoom = false;

	var tree;
	var baseSvg,
		svgGroup,
		nodeGroup, // If nodes are not grouped together, after a click the svg node will be set after his corresponding tooltip and will hide it
		nodeGroupTooltip,
		linkGroup,
		linkGroupToolTip,
		defs;

	init(urlService, jsonData);

	function init(urlService, jsonData)
	{
		urlService_ = urlService;
		if (urlService && urlService.length > 0)
		{
			if (urlService.charAt(urlService.length - 1) != '/')
				urlService_ += '/';
		}

		if (jsonData)
			drawTree(jsonData);
		else
		{
			console.error(jsonData);
			alert('Invalides data.');
		}
	}

	function drawTree(jsonData)
	{
//console.log('a' +height);
//console.log('a' +width);
height  = 1000
width  = 2000
		tree = d3.layout.tree().size([ height, width ]);
		root = jsonData;
		root.fixed = true;
        //console.log(height);
		// Dynamically set the height of the main svg container
		// breadthFirstTraversal returns the max number of node on a same level
		// and colors the nodes
		var maxDepth = 0;
		var maxTreeWidth = breadthFirstTraversal(tree.nodes(root), function(currentLevel) {
			maxDepth++;
			currentLevel.forEach(function(node) {
				if (node.t == '1')	node.color = t1;
				if (node.t == 'a')	node.color = t1;
				if (node.t == '2')	node.color = t2;
				if (node.t == '3')	node.color = t3;
				if (node.t == '4')	node.color = t4;
				if (node.t == '5')	node.color = t5;
				if (node.t == '6')	node.color = t6;
				if (node.t == '7')	node.color = t7;
				if (node.t == '8')	node.color = t8;
				if (node.t == '9')	node.color = t9;

				node.color = '#FFFFFF';
				});
			});
		maxTreeWidth = 10;
		maxDepth = 15
		height = maxTreeWidth * (rectNode.height + 20) + tooltip.height + 20 - margin.right - margin.left;
		width = maxDepth * (rectNode.width * 1.5) + tooltip.width / 2 - margin.top - margin.bottom;
//console.log(maxTreeWidth);
//console.log(maxDepth);
//console.log(height);
//console.log(width);
        height =800;
        width =3000;
		tree = d3.layout.tree().size([ height, width ]);
		root.x0 = height / 2;
		//root.x0 = 100;
		root.y0 = 0;

		baseSvg = d3.select('#tree-container').append('svg')
	    .attr('width', width + margin.right + margin.left)
		.attr('height', height + margin.top + margin.bottom)
		.attr('class', 'svgContainer')
		.call(d3.behavior.zoom()
		      //.scaleExtent([0.5, 1.5]) // Limit the zoom scale
		      .on('zoom', zoomAndDrag));

		// Mouse wheel is desactivated, else after a first drag of the tree, wheel event drags the tree (instead of scrolling the window)
		getMouseWheelEvent();
		d3.select('#tree-container').select('svg').on(mouseWheelName, null);
		d3.select('#tree-container').select('svg').on('dblclick.zoom', null);

		svgGroup = baseSvg.append('g')
		.attr('class','drawarea')
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// SVG elements under nodeGroupTooltip could be associated with nodeGroup,
		// same for linkGroupToolTip and linkGroup,
		// but this separation allows to manage the order on which elements are drew
		// and so tooltips are always on top.
		nodeGroup = svgGroup.append('g')
					.attr('id', 'nodes');
		linkGroup = svgGroup.append('g')
					.attr('id', 'links');
		linkGroupToolTip = svgGroup.append('g')
			   				.attr('id', 'linksTooltips');
		nodeGroupTooltip = svgGroup.append('g')
			   				.attr('id', 'nodesTooltips');



        const svg = d3.select("svg");

        svg.append('foreignObject')
		.attr("x", 5)
        .attr("y", 100)
        .attr("width", 300)
        .attr("height", 200)
		.append('xhtml').html(function(d) {
					return '<div border=1 class="node-text wordwrap">1. 각 UV(GAID) 경로<br><br>2. 이탈:해당 페이지 방문 후 추가 방문이 없는 경우<br><br>3. <span style="color: #FFFFFF;  border: none;  background: #0000FF;">CTRL+클릭</span> : 하위 경로 펼치기<br><br>4. <span style="color: #000000;  border: none;  background: #7baade;">클릭(</span> : UV(GAID)별 상세 경로 , UVM별 상세 경로</div>';
				})
		;


		defs = baseSvg.append('defs');
		initArrowDef();
		initDropShadow();
        root.children.forEach(toggleAll);
		update(root);
	}




    function toggleAll(d) {
      if (d.children) {
                  d.children.forEach(toggleAll);
        toggle(d);
      }
    };

   // Toggle children
    function toggle(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      }
      else {
        d.children = d._children;
        d._children = null;
      }
    }

	function update(source)
	{



		// Compute the new tree layout
		var nodes = tree.nodes(root).reverse(),
			links = tree.links(nodes);

		// Check if two nodes are in collision on the ordinates axe and move them
		breadthFirstTraversal(tree.nodes(root), collision);
		// Normalize for fixed-depth
		nodes.forEach(function(d) {
			d.y = d.depth * (rectNode.width * 1.5);
		});

	// 1) ******************* Update the nodes *******************
		var node = nodeGroup.selectAll('g.node').data(nodes, function(d) {
			return d.id || (d.id = ++i);
		});

		var nodesTooltip = nodeGroupTooltip.selectAll('g').data(nodes, function(d) {
			return d.id || (d.id = ++i);
		});

		// Enter any new nodes at the parent's previous position
		// We use "insert" rather than "append", so when a new child node is added (after a click)
		// it is added at the top of the group, so it is drawed first
		// else the nodes tooltips are drawed before their children nodes and they
		// hide them
		var nodeEnter = node.enter().insert('g', 'g.node')
		.attr('class', 'node')
		.attr('transform', function(d) {
			  return 'translate(' + source.y0 + ',' + source.x0 + ')'; })
	    .on('mouseover', function(d) {
	        }
	    )
		.on('click', function(d) {
                    if (window.event.ctrlKey) {
                        click(d);
                    } else if (window.event.shiftKey) {
                    } else {
                    }
			    }
			);


		var nodeEnterTooltip = nodesTooltip.enter().append('g')
			.attr('transform', function(d) {
				  return 'translate(' + source.y0 + ',' + source.x0 + ')'; });

		nodeEnter.append('g').append('rect')
		.attr('rx', 1)
		.attr('ry', 1)
		.attr('width', rectNode.width)
		.attr('height', rectNode.height)
		.attr('class', 'node-rect')
		.attr('fill', function (d) { return d.color; })
		.attr('filter', 'url(#drop-shadow)');





		nodeEnter.append('foreignObject')
		.attr('x', rectNode.textMargin)
		.attr('y', rectNode.textMargin)
		.attr('width', function() {
					return (rectNode.width - rectNode.textMargin * 2) < 0 ? 0
							: (rectNode.width - rectNode.textMargin * 2)
				})
		.attr('height', function() {
					return (rectNode.height - rectNode.textMargin * 2) < 0 ? 0
							: (rectNode.height - rectNode.textMargin * 2)
				})
		.append('xhtml').html(function(d) {
					return '<div style="width: '
							+ (rectNode.width - rectNode.textMargin * 2) + 'px; height: '
							+ (rectNode.height - rectNode.textMargin * 2) + 'px;" class="node-text wordwrap">'
							+ '<b>' + d.n + '</b><br>'
							+ '<b>Code: </b>' + d.c + '<br>'
							+ '</div>';
				})
		;


		// Transition nodes to their new position.
		var nodeUpdate = node.transition().duration(duration)
		.attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });
		nodesTooltip.transition().duration(duration)
		.attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; });

		nodeUpdate.select('rect')
		.attr('class', function(d) { return d._children ? 'node-rect-closed' : 'node-rect'; });

		nodeUpdate.select('text').style('fill-opacity', 1);

		// Transition exiting nodes to the parent's new position
		var nodeExit = node.exit().transition().duration(duration)
			.attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
			.remove();
		nodesTooltip.exit().transition().duration(duration)
			.attr('transform', function(d) { return 'translate(' + source.y + ',' + source.x + ')'; })
		.remove();
		nodeExit.select('text').style('fill-opacity', 1e-6);

	// 2) ******************* Update the links *******************
		var link = linkGroup.selectAll('path').data(links, function(d) {
			return d.target.id;
		});
		var linkTooltip = linkGroupToolTip.selectAll('g').data(links, function(d) {
			return d.target.id;
		});

		function linkMarkerStart(direction, isSelected) {
			if (direction == 'SYNC')
			{
				return isSelected ? 'url(#start-arrow-selected)' : 'url(#start-arrow)';
			}
			return '';
		}

		function linkType(link) {
			return "Synchronous [\u2194]";
		}

		d3.selection.prototype.moveToFront = function() {
			  return this.each(function(){
				    this.parentNode.appendChild(this);
				  });
			};

		// Enter any new links at the parent's previous position.
			// Enter any new links at the parent's previous position.
			var linkenter = link.enter().insert('path', 'g')
			.attr('class', function(d) {

			    return 'linkt' +d.target.t; }
			    )
			.attr('id', function(d) { return 'linkID' + d.target.id; })
			.attr('d', function(d) { return diagonal(d); })
			.attr('marker-end', 'url(#end-arrow)')
			.attr('marker-start', function(d) { return linkMarkerStart('ASYN', false); })
			;

		// Transition links to their new position.
		var linkUpdate = link.transition().duration(duration)
						 	 .attr('d', function(d) { return diagonal(d); });
		linkTooltip.transition().duration(duration)
				   .attr('d', function(d) { return diagonal(d); });
	
		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
		.remove();
		
		linkTooltip.exit().transition()
		.remove();
	
		// Stash the old positions for transition.
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
	}
	
	// Zoom functionnality is desactivated (user can use browser Ctrl + mouse wheel shortcut)
	function zoomAndDrag() {
	    //var scale = d3.event.scale,
	    var scale = 1,
	        translation = d3.event.translate,
	        tbound = -height * scale,
	        bbound = height * scale,
	        lbound = (-width + margin.right) * scale,
	        rbound = (width - margin.left) * scale;
	    // limit translation to thresholds
	    translation = [
	        Math.max(Math.min(translation[0], rbound), lbound),
	        Math.max(Math.min(translation[1], bbound), tbound)
	    ];
	    d3.select('.drawarea')
	        .attr('transform', 'translate(' + translation + ')' +
	              ' scale(' + scale + ')');
	}
	
	// Toggle children on click.
	function click(d) {
		if (d.children) {
			d._children = d.children;
			d.children = null;
		} else {
			d.children = d._children;
			d._children = null;
		}
		update(d);
	}
	
	// Breadth-first traversal of the tree
	// func function is processed on every node of a same level
	// return the max level
	  function breadthFirstTraversal(tree, func)
	  {
		  var max = 0;
		  if (tree && tree.length > 0)
		  {
			  var currentDepth = tree[0].depth;
			  var fifo = [];
			  var currentLevel = [];
	
			  fifo.push(tree[0]);
			  while (fifo.length > 0) {
				  var node = fifo.shift();
				  if (node.depth > currentDepth) {
					  func(currentLevel);
					  currentDepth++;
					  max = Math.max(max, currentLevel.length);
					  currentLevel = [];
				  }
				  currentLevel.push(node);
				  if (node.children) {
					  for (var j = 0; j < node.children.length; j++) {
						  fifo.push(node.children[j]);
					  }
				  }
		  	}
			func(currentLevel);
			return Math.max(max, currentLevel.length);
		}
		return 0;
	  }
	
	// x = ordoninates and y = abscissas
	function collision(siblings) {
	  var minPadding = 5;
	  if (siblings) {
		  for (var i = 0; i < siblings.length - 1; i++)
		  {
			  if (siblings[i + 1].x - (siblings[i].x + rectNode.height) < minPadding)
				  siblings[i + 1].x = siblings[i].x + rectNode.height + minPadding;
		  }
	  }
	}
	
	function removeMouseEvents() {
		// Drag and zoom behaviors are temporarily disabled, so tooltip text can be selected
		mousedown = d3.select('#tree-container').select('svg').on('mousedown.zoom');
		d3.select('#tree-container').select('svg').on("mousedown.zoom", null);
	}
	
	function reactivateMouseEvents() {
		// Reactivate the drag and zoom behaviors
		d3.select('#tree-container').select('svg').on('mousedown.zoom', mousedown);
	}
	
	// Name of the event depends of the browser
	function getMouseWheelEvent() {
		if (d3.select('#tree-container').select('svg').on('wheel.zoom'))
		{
			mouseWheelName = 'wheel.zoom';
			return d3.select('#tree-container').select('svg').on('wheel.zoom');
		}
		if (d3.select('#tree-container').select('svg').on('mousewheel.zoom') != null)
		{
			mouseWheelName = 'mousewheel.zoom';
			return d3.select('#tree-container').select('svg').on('mousewheel.zoom');
		}
		if (d3.select('#tree-container').select('svg').on('DOMMouseScroll.zoom'))
		{
			mouseWheelName = 'DOMMouseScroll.zoom';
			return d3.select('#tree-container').select('svg').on('DOMMouseScroll.zoom');
		}
	}
	
	function diagonal(d) {
		var p0 = {
			x : d.source.x + rectNode.height / 2,
			y : (d.source.y + rectNode.width)
		}, p3 = {
			x : d.target.x + rectNode.height / 2,
			y : d.target.y  - 12 // -12, so the end arrows are just before the rect node
		}, m = (p0.y + p3.y) / 2, p = [ p0, {
			x : p0.x,
			y : m
		}, {
			x : p3.x,
			y : m
		}, p3 ];
		p = p.map(function(d) {
			return [ d.y, d.x ];
		});
		return 'M' + p[0] + 'C' + p[1] + ' ' + p[2] + ' ' + p[3];
	}
	
	function initDropShadow() {
		var filter = defs.append("filter")
		    .attr("id", "drop-shadow")
		    .attr("color-interpolation-filters", "sRGB");
		
		filter.append("feOffset")
		.attr("result", "offOut")
		.attr("in", "SourceGraphic")
	    .attr("dx", 0)
	    .attr("dy", 0);
	
		filter.append("feGaussianBlur")
		    .attr("stdDeviation", 2);
	
		filter.append("feOffset")
		    .attr("dx", 2)
		    .attr("dy", 2)
		    .attr("result", "shadow");
	
		filter.append("feComposite")
	    .attr("in", 'offOut')
	    .attr("in2", 'shadow')
	    .attr("operator", "over");
	}
	
	function initArrowDef(d) {
		// Build the arrows definitions
		// End arrow
		defs.append('marker')
		.attr('id', 'end-arrow')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrow')
		.append('path')
		.attr('d', 'M0,-5L10,0L0,5');
		
		// End arrow selected
		defs.append('marker')
		.attr('id', 'end-arrow-selected')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrowselected')
		.append('path')
		.attr('d', 'M0,-5L10,0L0,5');
	
		// Start arrow
		defs.append('marker')
		.attr('id', 'start-arrow')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrow')
		.append('path')
		.attr('d', 'M10,-5L0,0L10,5');
		
		// Start arrow selected
		defs.append('marker')
		.attr('id', 'start-arrow-selected')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrowselected')
		.append('path')
		.attr('d', 'M10,-5L0,0L10,5');
	}

}

function insert(par, data) {
   let newNode = d3.hierarchy(data);
   newNode.depth = par.depth + 1;
   newNode.parent = par;
   if (!par.children)
      par.children = [];
   par.children.push(newNode);
}

function test(value) {
   alert('test'+ value);
}



function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">Bubble chart</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# Bubble chart

Bubble charts are non-hierarchical [packed circles](/@d3/pack/2). The area of each circle is proportional its value (here, file size). The organic appearance of these diagrams can be intriguing, but also consider a [treemap](/@d3/treemap/2) or a humble [bar chart](/@d3/horizontal-bar-chart/2).`
)}

function u(pseqno) {
       var psite = document.getElementById("psite").value;
       var pdevice = document.getElementById("pdevice").value;
       var pday = document.getElementById("pday").value;
       var pkind = document.getElementById("pkind").value;
       window.open('/tree/popup/?kind='+pkind+'&type=pcid&no='+pseqno+'&day='+pday+'&site='+psite+'&device='+pdevice, pseqno+'(uid)', 'top=10, left=10, width=620, height=720, status=no, menubar=no, toolbar=no, resizable=no, scrollbars=no, location=no');
}

function m(pseqno) {
       var psite = document.getElementById("psite").value;
       var pdevice = document.getElementById("pdevice").value;
       var pday = document.getElementById("pday").value;
       var pkind = document.getElementById("pkind").value;
        window.open('/tree/popup/?kind='+pkind+'&type=mid&no='+pseqno+'&day='+pday+'&site='+psite+'&device='+pdevice, pseqno+'(mid)', 'top=10, left=10, width=620, height=720, status=no, menubar=no, toolbar=no, resizable=no, scrollbars=no, location=no');
}

function p(pseqno) {

       var psite = document.getElementById("psite").value;
       var pdevice = document.getElementById("pdevice").value;
       var pday = document.getElementById("pday").value;
       var pkind = document.getElementById("pkind").value;
       window.open('/tree/popup/?kind='+pkind+'&type=pv&no='+pseqno+'&day='+pday+'&site='+psite+'&device='+pdevice, pseqno+'(pv)', 'top=10, left=10, width=620, height=720, status=no, menubar=no, toolbar=no, resizable=no, scrollbars=no, location=no');
}

function b(pseqno,puidcnt) {
       var pkind = document.getElementById("pkind").value;
       window.open('/tree/bbl?kind='+pkind+'&bbl=1&no='+pseqno+'&uidcnt='+puidcnt, pseqno+'(bubble)', 'top=10, left=10, width=1400, height=920, status=no, menubar=no, toolbar=no, resizable=no, scrollbars=no, location=no');
}

function b5(pseqno) {

       var pkind = document.getElementById("pkind").value;
       window.open('/tree/bbl?kind='+pkind+'&bbl=5&no='+pseqno, pseqno+'(bubble)', 'top=10, left=10, width=1400, height=920, status=no, menubar=no, toolbar=no, resizable=no, scrollbars=no, location=no');

}



