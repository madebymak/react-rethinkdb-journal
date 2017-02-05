import React, { Component } from 'react';

class List extends Component {

  render() {
    // console.log(this.props.turtles.value());
    const turtleDivs = this.props.turtles.value();

    const sorted = turtleDivs.sort(function(a, b) {
                    return b.score - a.score;
                  });

    const turlesList =
        sorted.map(function(data) {
        return <div key={data.id}>
          <p>Happiness Level: {data.happy} <br/>
          {data.text} <br/>
          Sentiment Score: {data.score} </p>
        </div>;
      });

    return (
      <div>
        <h2>Top Sentiment Score</h2>
        {turlesList}
      </div>
    );
  }
}

export default List ;
