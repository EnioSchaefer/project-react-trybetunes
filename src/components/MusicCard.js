import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musicsData } = this.props;
    const musicDataArr = musicsData;

    return (
      <div>
        <img src={ musicsData[0].musicArt } alt={ musicsData[0].musicName } />
        { musicDataArr.map((music) => (
          <div key={ music.musicName }>
            <p>{ music.musicName }</p>
            <audio data-testid="audio-component" src={ music.musicPreview } controls>
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
    musicName: PropTypes.string,
    musicArt: PropTypes.string,
    musicPreview: PropTypes.string,
  }).isRequired,
};

export default MusicCard;
