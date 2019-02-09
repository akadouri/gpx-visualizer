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
        console.log(e);
        reader.readAsText(e.target.files[0]);
        var data = this.state.data;
        var maps = [];
        function parseFile() {
            $(reader.result).find('trkpt').each(function(index) {
                var obj = [];
                obj.lat = $(this).attr('lat');
                obj.lon = $(this).attr('lon');
                obj.ele = $(this).find('ele').text();
                obj.time = $(this).find('time').text();
                if(obj.lat != 0 && obj.lon != 0) { //no one is running in the Gulf of Guinea
                  maps.push(obj);
                }
            });
            maps.name = $(reader.result).find('name').text();
            data.push(maps);
            this.setState({data: data});
        }
    }
    render() {
        return (
            <div>
              <h> Hello, welcome to gpx file analyzer. </h>
              <br/>
              <input type="file" onChange={this.handleData} />
              {this.state.data.map(function(gpx) {
                  return <GpxViz key={gpx[0].time} data={gpx}/>
              })}
            </div>
        );
    }
}

module.exports = App;
