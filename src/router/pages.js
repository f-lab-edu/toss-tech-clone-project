var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { start, fetchData, createArticleListItem, addListItems, } from '../app.js';
import createArticleDetailPage from '../article.js';
export default (container) => {
    const home = () => {
        container.replaceChildren(start());
        fetchData().then((articles) => {
            const listItems = createArticleListItem(articles);
            addListItems(listItems);
        });
    };
    const article = (params) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = params;
        fetchData().then((articles) => {
            container.replaceChildren(createArticleDetailPage(articles[id]));
        });
    });
    const notFound = () => {
        container.textContent = 'Not Found!';
    };
    return {
        home,
        article,
        notFound,
    };
};
