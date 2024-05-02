import { start, fetchData } from '../app.js';
import articleDetail from '../article.js';

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
    container.innerHTML = articleDetail(articles[id]);
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
