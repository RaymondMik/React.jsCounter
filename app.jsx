function Buttons(props) {
  return (
    <div>
      <button type="button" className="btn btn-danger" onClick={ function() {props.onChange(-1);} }>-</button>
      <button type="button" className="btn btn-success" onClick={ function() {props.onChange(+1);} }>+</button>
    </div>
  )
}

var NumberOne = React.createClass({
  propTypes: {},
  getInitialState: function () {
    return {
      firstNumValue: 0
    }
  },
  render: function() {
    return (
      <div className="number-container-2">
        <div className="number one">
          {this.state.firstNumValue}
        </div>
      </div>
    );  
  }
});

var NumberTwo = React.createClass({
  propTypes: {},
  getInitialState: function() {
    return {
      secondNumValue: 0,
    }
  },
  incrementValue: function() {
    this.setState ({
      secondNumValue: 1
    });
  },   
  render: function() {
    return (
      <div className="number-container-1">
        <div className="number two">
          {this.state.secondNumValue}
        </div>
      </div>
    );  
  }
});

var ReactApplication = React.createClass({
      render: function() {
        return (
          <div>
            <div className="container numbers-container">
                <NumberOne numValue={this.props.firstNumValue} />
                <NumberTwo numValue={this.props.secondNumValue} />
            </div>
            <div className="container buttons-container">
                <Buttons />
            </div>
          </div>
       ); 
    }
})

ReactDOM.render( <ReactApplication />, document.getElementById('app-container') );