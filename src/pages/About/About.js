import React, { Component } from 'react';
import { inject } from 'mobx-react';

@inject('commonStore')
class About extends Component {
  componentDidMount() {
    this.props.commonStore.setPageTitle('Profile');
  }

  render() {
    return (
      <div>
        <div>Navigate to the About page to test if logged in properly</div>
      </div>
    );
  }
}

export default About;
