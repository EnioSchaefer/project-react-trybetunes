import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musicsData: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    const data = await getMusics(id);

    const name = data[0].artistName;

    const albumName = data[0].collectionName;

    const musicsData = data.filter((_element, index) => index !== 0);

    this.setState({
      artistName: name,
      albumName,
      musicsData,
    });
  }

  render() {
    const { artistName, albumName, musicsData } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p>Album</p>
          <h3 data-testid="artist-name">{ artistName }</h3>
          <h4 data-testid="album-name">{ albumName }</h4>
          {musicsData !== '' && <MusicCard musicsData={ musicsData } />}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
