var React = require('react');
var GpxViz = require('./GpxViz');

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: []
      };
      this.handleData = this.handleData.bind(this);
    }
    handleData(e) {
        var reader = new FileReader();
        reader.addEventListener("load", parseFile.bind(this), false);
        reader.readAsText(e.target.files[0]);
        var data = this.state.data;
        var maps = [];
        function parseFile() {
            $(reader.result).find('trkpt').each(function(index) {
                var obj = [];
                obj.lat = $(this).attr('lat');
                obj.lon = $(this).attr('lon');
                maps.push(obj);
            });
            var time = [];
            $(reader.result).find('time').each(function(index) {
                time.push($(this).text());
            });
            maps.time = time;
            data.push(maps);
            this.setState({data: data});
        }
        console.log("data.length: " + data.length);
    }
    render() {
        return (
            <div>
              <h> Hello, welcome to gpx file analyzer. </h>
              <br/>
              <input type="file" onChange={this.handleData} />
              {this.state.data.map(function(gpx) {
                  return <GpxViz key={gpx.time[0]} time={gpx.time} data={gpx}/>
              })}
            </div>
        );
    }
}

module.exports = App;
