import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

export default class AlgoliaUtil {

  static fetchFromAlgolia(index, query) {
    const client = algoliasearch(process.env.REACT_APP_INSTANTSEARCH_APP_ID, process.env.REACT_APP_INSTANTSEARCH_API_KEY);
    const config = {};

    const searchHelper = algoliasearchHelper(client, index, config);
    return new Promise((resolve, reject) => {
      if (query !== undefined) {
        searchHelper.setQuery(query)
      }
      searchHelper.setPage()
        .searchOnce((error, data, state) => {
          // console.log(error, data, state, 'error data and state');
          if (error) {
            reject({
              status: 404,
              message: "There was an error loading the content.",
              error: error
            });
          } else {
            resolve(data);
          }
        });
    })
  }  
}