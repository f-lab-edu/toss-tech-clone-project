import { start, fetchData } from '../app.js';
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
    fetchData();
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
