import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    const { musicsData } = this.props;
    const musicDataArr = musicsData;
    const checkedArray = [];
    for (let index = 0; index < musicDataArr.length; index += 1) {
      checkedArray.push(false);
    }

    this.setState({ isChecked: checkedArray });
  }

  render() {
    const { musicsData } = this.props;
    const { isLoading, isChecked } = this.state;
    const musicDataArr = musicsData;

    const favoriteSong = async (event) => {
      const checkedSong = event.target;
      const checkedSongPos = Number(checkedSong.id);
      isChecked[checkedSongPos] = !isChecked[checkedSongPos];
      console.log(isChecked);

      const checkedSongId = checkedSong.value;

      const musicObject = musicDataArr
        .find((music) => music.trackId === Number(checkedSongId));

      this.setState({ isLoading: true });

      await addSong(musicObject);

      this.setState({ isLoading: false });
    };

    if (isLoading === true) return <Loading />;
    const exists = !!isChecked;
    return (
      <div>
        <img src={ musicsData[0].artworkUrl100 } alt={ musicsData[0].collectionName } />
        { musicDataArr.map((music, index) => (
          <div key={ music.trackName }>
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
                checked={ exists ? isChecked[index] : false }
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
  musicsData: PropTypes.shape({
  }).isRequired,
};

export default MusicCard;
