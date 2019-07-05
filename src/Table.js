import React from 'react';
import { columns } from './columns';
import Button from './button';

const Table = ({ list, onDismiss, saveArticle }) => (
  <div className="table">
    {list.map(item => (
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

          <Button
            onClick={() => saveArticle(item.objectID)}
            className="button-inline"
          >
            save
          </Button>
        </span>
      </div>
    ))}
  </div>
);
export default Table;
