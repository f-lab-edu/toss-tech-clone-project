import {
  start,
  fetchData,
  createArticleListItem,
  addListItems,
} from '../app.js';
import createArticleDetailPage from '../article.js';

export default (container: HTMLElement) => {
  const home = () => {
    container.replaceChildren(start());

    fetchData().then((articles) => {
      const listItems = createArticleListItem(articles);
      addListItems(listItems);
    });
  };

  type paramsProps = {
    id: string;
  };

  const article = async (params: paramsProps) => {
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
