import React from "react";
import Autosuggest from "react-autosuggest";
import "./Autocomplete.css";
import pin from "./pin.svg";
import { caseEqual } from "./location-functions.js";

const getSuggestions = (allSuggestions, value) => {
  const inputValue = value.trim().toLowerCase();

  return inputValue.length === 0
    ? []
    : allSuggestions.filter(
        suggestion =>
          suggestion.toLowerCase().startsWith(inputValue) && !caseEqual(suggestion, inputValue)
      );
};

const renderSuggestion = suggestion => (
  <div>
    <img src={pin} alt="" className="pin-image" />
    {suggestion}
  </div>
);

export default class Autocomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(this.props.possibleValues, value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const value = this.state.value;
    const suggestions = this.state.suggestions;

    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      name: this.props.name,
      onChange: this.onChange,
      onFocus: this.props.onFocus
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={suggestion => suggestion}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        inputProps={inputProps}
      />
    );
  }
}
