const createArticleDetailPage = (articleItem) => {
  const { title, date, imageUrl, author, article } = articleItem;

  const articleContainer = document.createElement('div');
  articleContainer.setAttribute('id', 'article-container');

  const articleHeader = document.createElement('header');
  articleHeader.setAttribute('class', 'article-header');

  const articleTitle = document.createElement('h1');
  articleTitle.textContent = title;

  const authorInfo = document.createElement('p');
  authorInfo.textContent = author;

  const uploadDate = document.createElement('span');
  uploadDate.textContent = date;

  articleHeader.appendChild(articleTitle);
  articleHeader.appendChild(authorInfo);
  articleHeader.appendChild(uploadDate);

  articleContainer.appendChild(articleHeader);

  const articleMainSection = document.createElement('section');
  articleMainSection.setAttribute('class', 'article-main');

  const articleMainText = document.createElement('p');
  articleMainText.textContent = article;

  articleMainSection.appendChild(articleMainText);
  articleContainer.appendChild(articleMainSection);

  return articleContainer;
};

export default createArticleDetailPage;
