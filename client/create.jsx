import React, { Component } from 'react';
import css from './create.css';
import Slider from 'material-ui/Slider';


class CreateEntries extends Component {
  constructor(props, context) {
  super(props, context);
  this.state = {
    slider: 0
  };
  this.handleSecondSlider = this.handleSecondSlider.bind(this);
}

  handleSecondSlider(event, value) {
    this.setState({slider: value});
  };

  handleCreate(event) {
    event.preventDefault();
    const textInput = this.refs.message.value;
    const happinessInput = this.state.slider;
    const sentimentScore = textInput.split(" ").length * happinessInput;
    this.props.handleSubmit(textInput, happinessInput, sentimentScore);
    this.refs.journal.reset();
  }

  render() {
    return (
      <div>
        <form ref="journal">
          {/* // TODO: Check for empty values */}
          <p><textarea ref="message" placeholder="Tell me about your day." className="text-box">
          </textarea></p>
                  How happy do you feel today?
                  <Slider ref="happy" min={-10} max={10} defaultValue={0} step={1} value={this.state.slider} onChange={this.handleSecondSlider} />
                  {/* <input type="number" min="-10" max="10" ref="happy"></input><br/> */}
          <button onClick={ this.handleCreate.bind(this) }>Save Entry</button>
        </form>
      </div>
    );
  }
}

export default CreateEntries ;
