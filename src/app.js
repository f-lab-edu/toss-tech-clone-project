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

document.addEventListener('DOMContentLoaded', start);

fetch('data.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.articles);
    const { articles } = data;
    const list = document.getElementById('article-list');
    articles.forEach((article, index) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-item');
      listItem.innerHTML = `
        <a href="/articles/${index}">
          <h3>${article.title}</h3>
          <p>${article.subTitle}</p>
          <span>${article.date}</span>
        </a>
      `;
      list.appendChild(listItem);
    });
  });
