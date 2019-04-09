import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import data from '../data/massagedata.json';
import {withRouter} from 'react-router';

const languages = data.map(item => item.name);

const theme = {
  container: {
    position: 'relative',
    width: '88%',
  },
  input: {
    width: '100%',
    padding: '1px 0',
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
  },
  suggestionsContainerOpen: {
    display: 'block',
    position: 'absolute',
    top: 51,
    width: 290,
    border: '1Rpx solid #aaa',
    backgroundColor: '#fff',
    fontFamily: 'Helvetica, sans-serif',
    fontWeight: 300,
    fontSize: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 2,
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  suggestion: {
    cursor: 'pointer',
    padding: '10px 20px',
  },
  suggestionHighlighted: {
    backgroundColor: '#ddd',
  },
};
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return [...new Set(languages.filter(language => regex.test(language)))].slice(
    0,
    5,
  );
}

function getSuggestionValue(suggestion) {
  return suggestion;
}

function renderSuggestion(suggestion) {
  return <span>{suggestion}</span>;
}

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
    };
  }
  onChange = (_, {newValue}) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleSubmit = e => {
	  if (!this.state.value || this.state.value.trim().length===0)
		  this.props.history.push('/');
	  else
	 this.props.history.push(`/search/${this.state.value}`);
  };

  render() {
    const {id, placeholder} = this.props;
    const {value, suggestions} = this.state;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange,
    };

    return (
      <form
	      className="form-inline flex-nowrap flex-fill">
        <Autosuggest
          className="form-control d-inline-block"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{width: 'inherit'}}
          id={id}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
                        data-toggle="collapse"
                        data-target=".navbar-collapse.show"
            type="button"
            onClick={this.handleSubmit}>
            <i className="fa fa-search" />
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchBar);
