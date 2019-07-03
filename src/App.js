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
    this.fetchSearchTopStories(searchTerm);

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
    const isNotId = item => item.objectID !== id;
    //filter out items that don't match the id
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  };

  onSearchChange = event => this.setState({ searchTerm: event.target.value });
  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };
  fetchSearchTopStories = searchTerm => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(err => err);
  };
  render() {
    //deconstructed state
    const { searchTerm, result } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            search
          </Search>
        </div>
        {result ? (
          <Table list={result.hits} onDismiss={this.onDismiss} />
        ) : null}
      </div>
    );
  }
}

export default App;

/*
pg 86
need to go back and see about state being set after render within a component

result.hits = the way the api is returning results to use.
within our api call we are processing the info it is returning using this line
.then(result => this.setSearchTopStories(result))
we acess the results using result.hits
*/
