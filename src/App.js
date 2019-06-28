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
function isSearched(searchTerm) {
  return function(item) {
    //a condition which returns T / F
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list,
      searchTerm: ''
    };
    //bind this here or use arrow functions
  } //then define it

  onDismiss = id => {
    function isNotId(item) {
      return item.objectID !== id;
    }

    const updateList = this.state.list.filter(isNotId);
    this.setState({ list: updateList });
  };

  onSearchChange = event => this.setState({ searchTerm: event.target.value });

  render() {
    //added functional logic
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <form>
          <input type="text " onChange={this.onSearchChange} />
        </form>
        {list.filter(isSearched(searchTerm)).map(item => {
          const onHandleDismiss = () => this.onDismiss(item.objectID);
          return (
            <div key={item.objectID}>
              <span>{item.title}</span>
              <span>{item.url}</span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>
                <button onClick={onHandleDismiss} type="button">
                  Dismiss
                </button>
              </span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
