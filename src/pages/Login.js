import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      name: '',
    };
  }

  render() {
    const { buttonDisabled, name, isLoading } = this.state;
    const minChar = 3;

    const countChar = (event) => {
      this.setState({
        name: event.target.value,
        buttonDisabled: event.target.value.length < minChar,

      });
    };

    const onLogin = () => {
      const { history } = this.props;
      createUser({ name });
      const waitTime = 1501;

      this.setState({
        isLoading: true,
      });

      setTimeout(() => {
        this.setState({ isLoading: false });

        history.push('/search');
      }, waitTime);
    };

    if (isLoading === true) return <Loading />;

    return (
      <div data-testid="page-login">
        <p>Login</p>

        <form>
          <input type="text" data-testid="login-name-input" onChange={ countChar } />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            onClick={ onLogin }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.isRequired,
};

export default Login;
