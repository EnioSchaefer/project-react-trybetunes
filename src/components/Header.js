import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
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

    return (
      <header data-testid="header-component">
        <p> PLACEHOLDER HEADER </p>

        <NavLink to="/search" data-testid="link-to-search">
          Pesquisa
        </NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">
          Favoritas
        </NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">
          Perfil
        </NavLink>

        <span data-testid="header-user-name">
          {isLoading ? <Loading /> : userName}
        </span>
      </header>
    );
  }
}

export default Header;
