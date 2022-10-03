import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const userName = await getUser();

    this.setState({ isLoading: false, userName: userName.name });
  }

  render() {
    const { isLoading, userName } = this.state;
    if (isLoading === true) return <Loading />;

    return (
      <header data-testid="header-component">
        <p> PLACEHOLDER HEADER </p>

        <span data-testid="header-user-name">
          {userName}
        </span>
      </header>
    );
  }
}

export default Header;
