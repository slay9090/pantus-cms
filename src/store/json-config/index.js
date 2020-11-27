const newsArticleItemList = require("@/store/json-config/data-maps/news-articles-list-get");
const newsArticleItemDetail = require('@/store/json-config/data-maps/news-articles-detail-get');
const newsCategoriesItemList = require('@/store/json-config/data-maps/news-caregories-list-get');
const catalogApplicabilitiesList = require('@/store/json-config/data-maps/catalog-applicabilities');
const catalogCategoriesList = require('@/store/json-config/data-maps/catalog-categories');
const catalogBrandsList = require('@/store/json-config/data-maps/catalog-brands');
const productParts = require('@/store/json-config/data-maps/products-parts-list-get');


/// все новости
exports.newsArticlesItemsList = newsArticleItemList;
/// конкретная новость
exports.newsArticleItemDetail = newsArticleItemDetail;
/// все категории новостей
exports.newsCategoriesItemList = newsCategoriesItemList;
/// все применимости каталога
exports.catalogApplicabilitiesList = catalogApplicabilitiesList;
/// все категории каталога
exports.catalogCategoriesList = catalogCategoriesList;
/// все бренды каталга
exports.catalogBrandsList = catalogBrandsList;
/// запчасти
exports.urlMapFilterPartsGetList = productParts.urlMapFilterPartsGetList;
exports.productsPartsItemsList = productParts.productsPartsItemsList;