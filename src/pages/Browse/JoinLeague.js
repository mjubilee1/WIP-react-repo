import React, { Component } from 'react';
import { inject } from 'mobx-react';
import AlgoliaUtil from '../../utils/algoliaUtil';

@inject('commonStore', 'authStore')
class JoinLeague extends Component {
  componentDidMount() {
    this.props.commonStore.setPageTitle('Gamer&apos');
  }

  handleSearch = () => {
    const searchIndex = process.env.REACT_APP_INSTANTSEARCH_INDEX;
    const searchQuery = '';

    AlgoliaUtil.fetchFromAlgolia(searchIndex, searchQuery).then((data, state) => {
      console.log('Algolia search data', data);
    });
  };

  render() {
    return (
      <div>
        <p>Join League</p>
      </div>
    );
  }
}

export default JoinLeague;
