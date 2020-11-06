const newsArticleItemList = require("@/store/json-config/data-maps/news-articles-list-get");
const newsArticleItemDetail = require('@/store/json-config/data-maps/news-articles-detail-get');
const newsCategoriesItemList = require('@/store/json-config/data-maps/news-caregories-list-get')

/// все новости
exports.newsArticlesItemsList = newsArticleItemList;
/// конкретная новость
exports.newsArticleItemDetail = newsArticleItemDetail;
/// все категории
exports.newsCategoriesItemList = newsCategoriesItemList;