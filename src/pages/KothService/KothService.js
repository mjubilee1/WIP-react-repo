import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('commonStore')
class KothService extends Component {
  componentDidMount() {
    this.props.commonStore.setPageTitle('KOTH Service');
  }

  render() {
    return (
      <div>
        <p>Koth Service here</p>
      </div>
    );
  }
}

export default KothService;
