var ReactCounter = React.createClass({
     previousResult: null,  
     firstDigit: 0,
    
      // Set initial state with counter not running
      getInitialState: function() {
        return {
          running: false,
          result: 0,
          previousTime: 0,
        }
      },
      
      // Called as soon as Counter is added to the DOM
      componentDidMount: function() {
        this.interval = setInterval(this.timeCounter, 1000);
        //if (!this.previousResult) this.previousResult = 0;
        console.log('DidMount: ', this.state);
      },
  
      // Called as soon as Counter is removed from the DOM
      componentWillUnmount: function() {
        clearInterval(this.interval);
      },
  
      // Called as soon as Counter is updated
      componentDidUpdate: function() {
        if (this.previousResult != this.state.result) {
            this.previousResult = this.state.result;
        }
        if (this.state.result == 10) {
            this.setState({
                result: 0,
            });
        } 
        if (this.state.result == 9) {
            this.firstDigit++;
        } 
      },
  
      timeCounter: function() {
        if (this.state.running) {
          var now = Date.now();
          this.setState({
            previousTime: now,
            result: Math.floor(this.state.result + (now - this.state.previousTime) / 1000),  
          });
        }
      },
  
      startCounter: function() {
        this.setState({ 
          running: true,
          previousTime: Date.now(),
        });
      },
  
      stopCounter: function() {
        this.setState({ running: false });
      },
  
      resetCounter: function() {
        this.setState({
          result: 0,
          firstDigit: 0,
          previousTime: Date.now(),
        });
      },
  
      render: function() {
        // var secondDigit = Math.floor(this.state.elapsedTime / 1000);
        // var firstDigit = secondDigit < 10 ? 0 : '';
        // var previousSecondDigit = secondDigit > 0 ? secondDigit - 1 : 0;
        // if (secondDigit == 99) {
        //   this.stopCounter()
        // }
        var secondDigit = Math.floor(this.state.result / 1000);
        
        var scrollClass = this.state.running ? 'scroll' : '';
        var hideClass = this.state.running ? 'hide' : '';


        return (
          <div className="counter-container">
            <div className="numbers-container">
              <div className="number-container-1">
                  <div className="number">{this.firstDigit}</div>
              </div>
                <div className="number-container-2">
                  
                  <div className={"number plus-ten "}>{this.state.result}</div>
                  
                </div>
            </div>
            <div className="buttons-container">
                { this.state.running ? <button className="btn stop" onClick={this.stopCounter}>Stop</button> : <button className="btn start" onClick={this.startCounter}>Start</button> }
                <button className="btn reset" onClick={this.resetCounter}>Reset</button>
            </div>
          </div>
       ); 
    }
})

ReactDOM.render( <ReactCounter />, document.getElementById('app-container') );