import React, { Component } from 'react';
import { inject } from 'mobx-react';
import LoginForm from '../Form/LoginForm';

@inject('authStore')
class Login extends Component {

  render() {

    return (
      <>
        <div className="login-modal" ghost onClick={this.showModal}>
          Login
        </div>
      </>
    );
  }
}

export default Login;
