import {
  start,
  fetchData,
  createArticleListItem,
  addListItems,
} from '../app.js';
import createArticleDetailPage from '../article.js';

const datas = () =>
  fetch('../../data.json')
    .then((response) => response.json())
    .then((data) => {
      return data.articles;
    });

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
    const articles = await datas();

    container.replaceChildren(createArticleDetailPage(articles[id]));
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
