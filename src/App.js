import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var ReactCounter = React.createClass({
    currentFirstDigit: 0,
    previousFirstDigit: 0,
    previousSecondDigit: 0,  
    scrollFirstDigit: false,
    scrollSecondDigit: false,

    // Set initial state with counter not running
    getInitialState: function() {
        return {
            running: false,
            currentSecondDigit: 0,
        }
    },
      
    // Called as soon as Counter is added to the DOM
    componentDidMount: function() {
        this.interval = setInterval(this.timeCounter, 1000);
    },

    // Called as soon as Counter is removed from the DOM
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },

    // Called as soon as Counter is updated
    componentDidUpdate: function() {
        if (this.previousSecondDigit != this.state.currentSecondDigit) {
            // trigger scroll class
            this.scrollSecondDigit = true;
            this.previousSecondDigit = this.state.currentSecondDigit;
        }
        
        if (this.previousSecondDigit == this.state.currentSecondDigit) {
            // remove scroll class
            this.scrollSecondDigit = false;
        }
        
        if (this.previousFirstDigit != this.currentFirstDigit) {
            // trigger class
            this.scrollFirstDigit = true;
            this.previousFirstDigit = this.currentFirstDigit;
        }
        
        if (this.previousFirstDigit == this.currentFirstDigit) {
            // remove scroll class
            this.scrollFirstDigit = false;
        }
        
        if (this.state.currentSecondDigit == 10) {
            this.currentFirstDigit++;
        }
        
        if (this.state.currentSecondDigit == 10) {
            this.setState({
                currentSecondDigit: 0,
            });
            this.previousSecondDigit = 0;
        }

        // Stop and reset counter when it gets to 60
        if (this.currentFirstDigit == 6) {
            if (this.state.currentSecondDigit == 0) {
                this.setState({ 
                    running: false,
                    currentSecondDigit: 0
                });
                this.currentFirstDigit = 0;
                this.previousFirstDigit = 0;
                this.previousSecondDigit = 0;
            }
        }
    },

    timeCounter: function() {
        if (this.state.running) {
            this.setState({
                currentSecondDigit: this.state.currentSecondDigit + 1,  
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
        this.setState({ 
            running: false
        });
    },

    resetCounter: function() {
        this.setState({
          currentSecondDigit: 0,
          previousTime: Date.now(),
        });
        this.currentFirstDigit = 0;
        this.previousFirstDigit = 0;
        this.previousSecondDigit = 0;
    },

    render: function() {
        var scrollFirstDigit = this.scrollFirstDigit === true ? 'scroll' : '';
        var scrollSecondDigit = this.scrollSecondDigit === true ? 'scroll' : '';

        return (
            <div className="counter-container">
                <div className="numbers-container">
                    <div className="number-container one">
                        <div className={"number current " + scrollFirstDigit}>
                            {this.currentFirstDigit}
                        </div>
                        <div className={"number previous " + scrollFirstDigit}>
                            {this.previousFirstDigit}
                        </div>
                    </div>
                    <div className="number-container two">
                        <div className={"number current " + scrollSecondDigit}>
                            {this.state.currentSecondDigit}
                        </div>
                        <div className={"number previous " + scrollSecondDigit}>
                            {this.previousSecondDigit}
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
