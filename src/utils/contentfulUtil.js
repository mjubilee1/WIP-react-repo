import { createClient } from "contentful";
class ContentfulUtil {
  client = null;

  constructor() {
    this.client = createClient({
      space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
      host: process.env.REACT_APP_CONTENTFUL_HOST,
      accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
      environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT,
    });
  }

  renderImage() {
    let image = null;
    this.client.getAsset('PqtJeogBQSMMXnxwHWokN')
    .then((asset) => {
      image = asset.fields.file.url;
    })
    .catch((error) => {
      console.log("Error getting image from Contentful")
    })

    return image;
  }
}

export default new ContentfulUtil();