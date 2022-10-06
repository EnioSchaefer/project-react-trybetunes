import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { musicsData } = this.props;
    const musicDataArr = musicsData;
    const checkedArray = [];
    for (let index = 0; index < musicDataArr.length; index += 1) {
      checkedArray.push(false);
    }

    this.setState({ isLoading: true });

    const favoriteSongs = await getFavoriteSongs();

    favoriteSongs.forEach((song) => {
      const indexFavorite = musicDataArr
        .findIndex((music) => song.trackId === music.trackId);
      checkedArray[indexFavorite] = true;
    });

    this.setState({ isLoading: false, isChecked: checkedArray });
  }

  render() {
    const { musicsData, albumArtwork, albumName } = this.props;
    const { isLoading, isChecked } = this.state;
    const musicDataArr = musicsData;

    const favoriteSong = async (event) => {
      const checkedSong = event.target;
      const checkedSongPos = Number(checkedSong.id);
      isChecked[checkedSongPos] = !isChecked[checkedSongPos];

      const checkedSongId = checkedSong.value;

      const musicObject = musicDataArr
        .find((music) => music.trackId === Number(checkedSongId));

      this.setState({ isLoading: true });

      await addSong(musicObject);

      this.setState({ isLoading: false });
    };

    if (isLoading === true) return <Loading />;
    return (
      <div>
        <img src={ albumArtwork } alt={ `Artwork de ${albumName}` } />
        { musicDataArr.map((music, index) => (
          <div key={ music.trackId }>
            <p>{ music.trackName }</p>
            <label
              htmlFor={ music.trackId }
            >
              Favorita
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                id={ index }
                onChange={ favoriteSong }
                value={ music.trackId }
                checked={ isChecked ? isChecked[index] : false }
              />
            </label>

            <audio data-testid="audio-component" src={ music.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
          </div>
        )) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  albumName: PropTypes.string.isRequired,
  albumArtwork: PropTypes.string.isRequired,
};

export default MusicCard;
