import React, { Component } from 'react';
import Table from './Table';
import Search from './Search';
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
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;
