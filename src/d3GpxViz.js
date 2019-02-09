var d3GpxViz = {}
var d3 = require('d3');

d3GpxViz.create = function(el, props, state) {
    this.update(el, state);
};

d3GpxViz.update = function(el, state) {
    var scales = this._scales(el, state.data);
    this._drawPoints(el, scales, state.data);
};

d3GpxViz._drawPoints = function(el, scales, data) {
    //calculate lowest/highest points
    var latLow = data[0].lat;
    var latHi = data[0].lat;
    var lonLow = data[0].lon;
    var lonHi = data[0].lon;
    for (var i = 0; i < data.length; i++) {
        if (data[i].lat < latLow) {
            latLow = data[i].lat;
        }
        if (data[i].lat > latHi) {
            latHi = data[i].lat;
        }
        if (data[i].lon < lonLow) {
            lonLow = data[i].lon;
        }
        if (data[i].lon > lonHi) {
            lonHi = data[i].lon;
        }
    }
    console.log("latLow: " + latLow + " latHi: " + latHi + " lonLow: " +
        lonLow + " lonHi: " + lonHi);

    var svg = d3.select(el)
        .append("svg")
        .attr("width", scales.width + scales.margin)
        .attr("height", scales.height + scales.margin);

    var xScale = d3.scaleLinear()
        .domain([latHi, latLow])
        .range([0, scales.height]);

    var yScale = d3.scaleLinear()
        .domain([lonHi, lonLow])
        .range([0, scales.width]);

    var line = d3.line()
        .x(function(d) {
            return yScale(d.lon);
        })
        .y(function(d) {
            return xScale(d.lat);
        })
        //.interpolate("linear");

    svg.append("path")
        .attr("d", line(data))
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none");
};

d3GpxViz._scales = function(el, data) {
    if (!data) {
        return null;
    }
    var width = 200;
    var margin = 50;
    var height = 200;
    return {
        width: width,
        margin: margin,
        height: height
    };
};

d3GpxViz.destroy = function(el) {

};

module.exports = d3GpxViz;
