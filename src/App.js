import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const testing = 'hi there!';
  const greetingObj = {
    firstName: 'Dan',
    lastName: 'Huang',
    greeting: function greeting() {
      return `hello ${this.firstName} ${this.lastName}!`;
    }
  };
  return <div>{greetingObj.greeting()}</div>;
}

export default App;
