const start = () => {
  const homeContainer = document.createElement('div');

  const header = document.createElement('header');
  const mainSection = document.createElement('section');

  const mainTitle = document.createElement('h1');
  mainTitle.setAttribute('id', 'main-title');
  mainTitle.textContent = '개발';

  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('id', 'main-container');

  const articleList = document.createElement('ul');
  articleList.setAttribute('id', 'article-list');

  mainContainer.appendChild(articleList);

  mainSection.appendChild(mainTitle);
  mainSection.appendChild(mainContainer);

  homeContainer.appendChild(header);
  homeContainer.appendChild(mainSection);

  return homeContainer;
};

// document.addEventListener('DOMContentLoaded', start);

type articleProps = {
  title: string;
  subTitle: string;
  date: string;
};

const createArticleListItem = (articles: articleProps[]) => {
  const listItems: HTMLElement[] = [];

  articles.forEach((article, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.setAttribute('data-navigation', '');

    const anchor = document.createElement('a');
    anchor.setAttribute('data-navigation', '');
    anchor.setAttribute('href', `/articles/${index}`);

    const listTitle = document.createElement('h3');
    listTitle.textContent = article.title;

    const subTitle = document.createElement('p');
    subTitle.textContent = article.subTitle;

    const dateCreated = document.createElement('span');
    dateCreated.textContent = article.date;

    anchor.appendChild(listTitle);
    anchor.appendChild(subTitle);
    anchor.appendChild(dateCreated);

    listItem.appendChild(anchor);
    listItems.push(listItem);
  });

  return listItems;
};

const addListItems = (listItems: HTMLElement[]) => {
  const list = document.getElementById('article-list');

  listItems.forEach((item) => {
    list?.appendChild(item);
  });
};

const fetchData = () => {
  return fetch('../data.json')
    .then((response) => response.json())
    .then((data) => {
      const { articles } = data;
      return articles;
    });
};

export { start, fetchData, createArticleListItem, addListItems };
