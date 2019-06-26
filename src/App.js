import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    //added functional logic
    const helloWorld = 'Welcome to the Road to learn React';

    const greetingObj = {
      firstName: 'Dan',
      lastName: 'Huang',
      age: 36,
      greeting: function greeting() {
        return `hello ${this.firstName} ${this.lastName}!`;
      }
    };
    return (
      <div>
        <h1>{helloWorld}</h1>
        {greetingObj.greeting()} who is {greetingObj.age}
      </div>
    );
  }
}

export default App;
