import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('commonStore')
class Dashboard extends Component {
  componentDidMount() {
    this.props.commonStore.setPageTitle('Dashboard');
  }

  render() {
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
