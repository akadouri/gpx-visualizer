var d3GpxViz = require('./d3GpxViz');
var ReactDOM = require('react-dom')
var React = require('react');

var GpxViz = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        domain: React.PropTypes.object
    },

    componentDidMount: function() {
        console.log(this.props.data);
        var el = ReactDOM.findDOMNode(this);
        d3GpxViz.create(el, {
            width: '100%',
            height: '100%'
        }, this.getGpxState());
    },

    getGpxState: function() {
        return {
            data: this.props.data,
            domain: this.props.domain
        };
    },

    exportData: function() {
      console.log(ReactDOM.findDOMNode(this));
    },

    render: function() {
        var style = {
          color : 'black'
        };
        return (
        <div className="GpxViz">
          <p>Time Started: {this.props.data[0].time}</p>
          <p>Time Ended: {this.props.data[this.props.data.length - 1].time}</p>
          //TODO display corresponding values
          <p>Distance: </p>
          <p>Lowest Elevation: </p>
          <p>Highest Elevation: </p>
          <p>Total elevation gain: </p>
          <p>{this.props.data.name}</p>
          <button onClick={this.exportData}>Export</button>
        </div>);
    }
});

module.exports = GpxViz;
