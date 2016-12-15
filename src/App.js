import React from 'react';
import './App.css';

var ReactCounter = React.createClass({
    
    options: {
      hours: false,
      minutes: false,
      seconds: true,
      interval: 1000,   // update interval - must be bigger than animation time
      animationTime: 300 // animation time of your transition - could be calculated in react instead of matcing transition in css class
    },

    //Set initial state with counter not running
    getInitialState: function() {
         return {
            running: false,
            scroll: false,
            count: -1,
            countFirst: -1,
            scrollFirst: false,
        }
    },

    // Called as soon as Counter is removed from the DOM
    componentWillUnmount: function() {
        this.resetCounter();
    },

    // Called as soon as Counter is updated
    componentDidUpdate: function() {
        var self = this;
          setTimeout(function(){
            if (self.state.scroll) {
              self.setState({
                  scroll: false,
                  scrollFirst: false,
              });
            }

          }, this.options.animationTime);

        if (this.state.count === 10) {
            this.setState({
                count: 0,
            })
        }

        if (this.state.countFirst === 5) {
            clearInterval(this.interval);
            this.setState({
                count: -1,
                countFirst: -1,
                scroll: false,
                scrollFirst: false,
                running: false,
            })
        }

    },

    startCounter: function() {
        var self = this;
            this.interval = setInterval(function() {
            self.setState({
              scroll: true,
              running: true,
              count: self.state.count + 1
            });

            if (self.state.count === 9) {
                self.setState({
                    countFirst: self.state.countFirst + 1,
                    scrollFirst: true,
                })
            }

        }, this.options.interval);
    },

    stopCounter: function() {
        this.setState({ 
            running: false,
            scroll: false,
        });
    },

    resetCounter: function() {
        clearInterval(this.interval);
        this.setState({
            running: false,
            scroll: false,
            count: -1
        });
    },

    render: function() {

        console.log(this.state.countFirst);

        var countCurrent = this.state.count;
        var countIncremented = this.state.count + 1;

        if ( countCurrent === 9 ) {
            countIncremented = 0;
        }

        var currentDigit = (this.state.scroll) ? countIncremented : countCurrent;
        var prevDigit = (this.state.scroll) ? countCurrent : countIncremented;

        var countCurrentFirst = this.state.countFirst;
        var countIncrementedFirst = this.state.countFirst + 1;

        var currentDigitFirst = (this.state.scrollFirst) ? countIncrementedFirst : countCurrentFirst;
        var prevDigitFirst = (this.state.scrollFirst) ? countCurrentFirst : countIncrementedFirst;

        var scrollClass = this.state.scroll && currentDigit !== prevDigit ? 'scroll' : '';
        var scrollFirst = this.state.scrollFirst && currentDigitFirst !== prevDigitFirst ? 'scroll' : '';
    

        return (
            <div className="counter-container">
                <div className="numbers-container">
                    <div className="number-container one">
                        <div className={"number current " + scrollFirst}>
                            {currentDigitFirst}
                        </div>
                        <div className={"number previous " + scrollFirst}>
                            {prevDigitFirst}
                        </div>
                    </div>
                    <div className="number-container two">
                        <div className={"number current " + scrollClass}>
                            {currentDigit}
                        </div>
                        <div className={"number previous " + scrollClass}>
                            {prevDigit}
                        </div>
                    </div>
                </div>
                <div className="buttons-container">
                    {this.state.running ? <button className="btn stop" onClick={this.stopCounter}>Stop</button> : <button className="btn start" onClick={this.startCounter}>Start</button> }
                    <button className="btn reset" onClick={this.resetCounter}>Reset</button>
                </div>
            </div>
        ); 
    }
        
})

// ReactDOM.render( <ReactCounter />, document.getElementById('app-container') );

export default ReactCounter;


