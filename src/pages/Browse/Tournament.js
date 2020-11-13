import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('commonStore')
class Tournament extends Component {
  componentDidMount() {
    this.props.commonStore.setPageTitle('Tournament - Gamer&apos');
  }

  render() {
    return (
      <div>
        <p>Tournament style</p>
      </div>
    );
  }
}

export default Tournament;
