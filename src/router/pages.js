import {
  start,
  fetchData,
  createArticleListItem,
  addListItems,
} from '../app.js';
import createArticleDetailPage from '../article.js';

export default (container) => {
  const home = () => {
    start();
    fetchData().then((articles) => {
      const listItems = createArticleListItem(articles);
      addListItems(listItems);
    });
  };

  const article = async (params) => {
    const { id } = params;

    fetchData().then((articles) => {
      container.replaceChildren(createArticleDetailPage(articles[id]));
    });
  };

  const notFound = () => {
    container.textContent = 'Not Found!';
  };

  return {
    home,
    article,
    notFound,
  };
};
