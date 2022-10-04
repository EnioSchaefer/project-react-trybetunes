import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      lastInput: '',
      inputText: '',
      searchResponse: false,
      buttonDisabled: true,
      isLoading: false,
    };
  }

  render() {
    const { buttonDisabled, inputText, isLoading,
      searchResponse, lastInput } = this.state;
    const minChar = 2;

    const countChar = (event) => {
      this.setState({
        inputText: event.target.value,
        buttonDisabled: event.target.value.length < minChar,
      });
    };

    const getArtist = async () => {
      this.setState({
        lastInput: inputText,
        inputText: '',
        isLoading: true,
      });

      const response = await searchAlbumsAPI(inputText);

      console.log(response);

      this.setState({
        isLoading: false,
        searchResponse: (response.length === 0 ? false : JSON.stringify(response)),
      });
    };

    return (
      <>
        <Header />
        <div data-testid="page-search">
          <p>Search</p>

          {searchResponse !== false
            ? (
              <>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  {lastInput}
                </p>
                <div>
                  {JSON.parse(searchResponse).map((result) => (
                    <NavLink
                      to={ `/album/${result.collectionId}` }
                      key={ result.collectionId }
                      data-testid={ `link-to-album-${result.collectionId}` }
                    >
                      <img src={ result.artworkUrl100 } alt={ result.collectionName } />
                      <p>
                        { result.collectionName }
                      </p>
                      <p>
                        { result.artistName }
                      </p>
                    </NavLink>
                  ))}
                </div>
              </>
            ) : <p> Nenhum álbum foi encontrado </p>}

          {isLoading ? <Loading /> : (
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
                onClick={ getArtist }
              >
                Pesquisar
              </button>
            </form>
          )}

        </div>
      </>
    );
  }
}

export default Search;
