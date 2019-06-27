import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
];

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
      <div className="App">
        <React.Fragment>{greetingObj.greeting()}</React.Fragment>
        {list.map(function(item) {
          return (
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;