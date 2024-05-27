import createRouter from './router/router.js';
import createPages from './router/pages.js';
const container = document.querySelector('#root');
const pages = createPages(container);
const router = createRouter();
router
    .addRoute('/', pages.home)
    .addRoute('/articles/:id', pages.article)
    .setNotFound(pages.notFound)
    .start();
