const articleDetail = (articleItem) => {
  const { title, date, imageUrl, author, article } = articleItem;

  return `
    <div id="article-container">
      <header class="article-header">
        <h1>${title}</h1>
        <p>${author}</p>
        <span>${date}</span>
      </header>
      <section class="article-main">
        <p>${article}</p>
      </section>
    </div>
  `;
};

export default articleDetail;
