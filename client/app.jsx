//Currently a mix of ES5 and ES6 which I know is bad :(

// import React, { Component } from 'react';
// import ReactDOM from 'react';
// import ReactRethinkdb from 'react-rethinkdb';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRethinkdb = require('react-rethinkdb');

import Create from './create.jsx';
import List from './list.jsx';

var r = ReactRethinkdb.r;

// Open a react-rethinkdb session (a WebSocket connection to the server)
ReactRethinkdb.DefaultSession.connect({
  host: 'localhost', // hostname of the websocket server
  port: 8015,        // port number of the websocket server
  path: '/db',       // HTTP path to websocket route
  secure: false,     // set true to use secure TLS websockets
  db: 'test',        // default database, passed to rethinkdb.connect
});

// Create our React component ES5
var App = React.createClass({

  // Enable RethinkDB query subscriptions in this component
  mixins: [ReactRethinkdb.DefaultMixin],

//obsolete way of interacting with db
  observe: function(props, state) {
    return {
      turtles: new ReactRethinkdb.QueryRequest({
        query: r.table('turtles'), // RethinkDB query
        changes: true,             // subscribe to realtime changefeed
        initial: [],               // return [] while loading
      }),
    };
  },

  handleSubmit(textInput, happinessInput, sentimentScore) {
    // console.log(textInput, happinessInput, sentimentScore);
    const query = r.table('turtles').insert({
      text: textInput,
      happy: happinessInput,
      score: sentimentScore
    });
    ReactRethinkdb.DefaultSession.runQuery(query);
  },

//Reloads List component
  componentDidUpdate() {
    console.log("updated");
    const query = r.table('turtles').orderBy(r.desc("score"))
    ReactRethinkdb.DefaultSession.runQuery(query);
  },

  render: function() {
    return <div>
      <h1> Happiness Journal </h1>
      <Create handleSubmit={this.handleSubmit} />
      <List turtles={this.data.turtles} />
    </div>;
  },
});

ReactDOM.render(<App />, document.getElementById('app'));
