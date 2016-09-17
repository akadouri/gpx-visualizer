var d3GpxViz = require('./d3GpxViz');
var ReactDOM = require('react-dom')
var React = require('react');

var GpxViz = React.createClass({
    propTypes: {
        data: React.PropTypes.array,
        domain: React.PropTypes.object
    },

    componentDidMount: function() {
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

    render: function() {
        return ( <div className="GpxViz">
          <p>{this.props.time[0]}</p>
        </div>);
    }
});

module.exports = GpxViz;
