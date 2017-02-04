import React, { Component } from 'react';

class List extends Component {

  render() {
    // console.log(this.props.turtles.value());
    const turtleDivs =
      this.props.turtles.value().map(function(data) {
        return <div key={data.id}>
          <p>happy: {data.happy} <br/>
          text: {data.text} <br/>
          score: {data.score} </p>
        </div>;
      });

    return (
      <div className="App">
        <h2>Recent</h2>
        {turtleDivs}
      </div>
    );
  }
}

export default List ;
