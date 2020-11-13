import React, { Component } from 'react';
import { inject } from 'mobx-react';
import RegisterForm from '../Form/RegisterForm';

@inject('authStore')
class Register extends Component {
  state = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;
    const { ghost } = this.props;

    return (
      <>
        <div className="register-modal" ghost={ghost} onClick={this.showModal}>
          Register
        </div>
        {/* <Modal visible={visible} title="Join Sleepless Gamer's" onCancel={this.handleCancel} footer={null}>
          <RegisterForm authStore={this.props.authStore} />
    </Modal> */}
      </>
    );
  }
}

export default Register;
