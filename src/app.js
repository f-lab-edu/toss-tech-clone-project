const start = () => {
  const app = document.getElementById('root');

  app.innerHTML = `
    <header></header>
    <section>
      <h1 id="main-title">개발</h1>
      <div id="main-container">
        <ul id="article-list"></ul>
      </div>
    </section>
  `;
};

// document.addEventListener('DOMContentLoaded', start);

const fetchData = () => {
  fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      const { articles } = data;
      const list = document.getElementById('article-list');
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
        list.appendChild(listItem);
      });
    });
};

export { start, fetchData };
