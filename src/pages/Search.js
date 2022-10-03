import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
    };
  }

  render() {
    const { buttonDisabled } = this.state;
    const minChar = 2;

    const countChar = (event) => {
      this.setState({
        buttonDisabled: event.target.value.length < minChar,
      });
    };

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Search</p>

          <form htmlFor="searchButton">
            <label htmlFor="searchInput">
              <input
                type="text"
                id="searchInput"
                data-testid="search-artist-input"
                onChange={ countChar }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
