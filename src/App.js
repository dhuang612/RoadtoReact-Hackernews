import React, { Component } from 'react';
import Table from './Table';
import Search from './Search';

import './App.css';

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
    //bind this here or use arrow functions
  } //then define it
  componentDidMount() {
    const { searchTerm } = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      //transformed into a json data structure
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  setSearchTopStories = result => {
    this.setState({ result });
  };

  onDismiss = id => {
    function isNotId(item) {
      return item.objectID !== id;
    }

    const updateList = this.state.list.filter(isNotId);
    this.setState({ list: updateList });
  };

  onSearchChange = event => this.setState({ searchTerm: event.target.value });

  render() {
    //deconstructed state
    const { searchTerm, result } = this.state;
    if (!result) {
      return null;
    }
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            search
          </Search>
        </div>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;

/*
pg 86
need to go back and see about state being set after render within a component
*/
