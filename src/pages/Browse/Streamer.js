import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('commonStore', 'authStore')
class Streamer extends Component {
  componentDidMount() {
    this.props.commonStore.setPageTitle('Streamer - Gamer&apos');
  }

  render() {
    return (
      <div className="content-center">
        <p>Streamer page</p>
      </div>
    );
  }
}

export default Streamer;
