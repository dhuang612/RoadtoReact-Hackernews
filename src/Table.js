import React, { Component } from 'react';
import columns from './columns';
const isSearched = searchTerm => {
  return function(item) {
    //a condition which returns T / F
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
};

const Button = ({ onClick, className = '', children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectID} className="table-row">
        <span style={columns.largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={columns.midColumn}>{item.author}</span>
        <span style={columns.smallColumn}>{item.num_comments}</span>
        <span style={columns.smallColumn}>{item.points}</span>
        <span style={columns.smallColumn}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
);
export default Table;
