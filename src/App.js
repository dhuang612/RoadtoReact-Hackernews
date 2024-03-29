import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table';
import { Route, Link } from 'react-router-dom';
import favorites from './favorites';
import Search from './Search';
import Button from './button';

import './App.css';

const DEFAULT_QUERY = 'react';
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
      //reflects the search term
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
      error: null,
      favorites: []
    };
    //bind this here or use arrow functions
  } //then define it
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  setSearchTopStories = result => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;
    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];

    const updatedHits = [...oldHits, ...hits];
    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  };

  onDismiss = id => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];
    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    //filter out items that don't match the id

    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page } }
    });
  };
  saveArticle = id => {
    this.setState({ favorites: id });
  };
  needsToSearchTopStories = searchTerm => !this.state.results[searchTerm];
  onSearchChange = event => this.setState({ searchTerm: event.target.value });
  onSearchSubmit = event => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    //if we don't have the searchTerm cached make the api call
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  };
  //took out the api call and moved to its own function
  fetchSearchTopStories = (searchTerm, page = 0) => {
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this.setSearchTopStories(result.data))
      .catch(error => this.setState({ error }));
  };
  render() {
    //deconstructed state
    const { searchTerm, results, searchKey, error } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;
    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className="page">
        <div className="interactions">
          <Route exact path="/favorites" component={favorites} />
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            search
          </Search>
          <span>
            <Link to="./favorites">Saved Articles</Link>
          </span>
        </div>
        {error ? (
          <div className="interactions">
            <p>Something went wrong. </p>
          </div>
        ) : (
          <Table
            list={list}
            onDismiss={this.onDismiss}
            saveArticle={this.saveArticle}
          />
        )}
        <div className="interactions">
          <Button
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
