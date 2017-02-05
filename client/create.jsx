import React, { Component } from 'react';

class CreateEntries extends Component {

  handleCreate(event) {
    event.preventDefault();
    const textInput = this.refs.message.value;
    const happinessInput = this.refs.happy.value;
    const sentimentScore = textInput.split(" ").length * happinessInput;
    this.props.handleSubmit(textInput, happinessInput, sentimentScore);
    this.refs.journal.reset();
  }

  render() {
    return (
      <div className="App">
        <form ref="journal">
  {/*// TODO: verify number value is in range  */}
          On a scale from -10 to 10, how happy do you feel today? <input type="number" min="-10" max="10" ref="happy"></input>
  {/* // TODO: Check for empty values */}
          <p><textarea ref="message" placeholder="Tell me about your day." rows="10" cols="30">
          </textarea></p>
          <button onClick={ this.handleCreate.bind(this) }>Save Entry</button>
        </form>
      </div>
    );
  }
}

export default CreateEntries ;
