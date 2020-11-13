import React, { Component } from 'react';
import { inject } from 'mobx-react';
import ContentfulProfile from '../../components/Contentful/Profile';

@inject('commonStore')
class Profile extends Component {
  componentDidMount() {
    this.props.commonStore.setPageTitle('Profile');
  }

  render() {
    return (
      <div className="gamer-profile">
        <ContentfulProfile />
        <p>Profile Tables here</p>
      </div>
    );
  }
}

export default Profile;
