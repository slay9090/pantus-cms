const newsArticleItemList = require("@/store/json-config/data-maps/news-articles-list-get");
const newsArticleItemDetail = require('@/store/json-config/data-maps/news-articles-detail-get');
const newsCategoriesItemList = require('@/store/json-config/data-maps/news-caregories-list-get');
const catalogApplicabilitiesList = require('@/store/json-config/data-maps/catalog-applicabilities');
const catalogCategoriesList = require('@/store/json-config/data-maps/catalog-categories');
const catalogBrands = require('@/store/json-config/data-maps/catalog-brands');
const productParts = require('@/store/json-config/data-maps/products-parts-list-get');
const crmOrdersList = require('@/store/json-config/data-maps/crm-orders-list')
const crmOrderDetail = require('@/store/json-config/data-maps/crm-order-detail')


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
exports.catalogBrandsList = catalogBrands.catalogBrandsList;
exports.catalogBrandDetail = catalogBrands.catalogBrandDetail;
/// запчасти
exports.urlMapFilterPartsGetList = productParts.urlMapFilterPartsGetList;
exports.productsPartsItemsList = productParts.productsPartsItemsList;

exports.crmOrdersMapedList = crmOrdersList.crmOrdersMapedList;
exports.crmOrdersMapedUrlFilter = crmOrdersList.crmOrdersMapedUrlFilter;


exports.crmOrderDetail = crmOrderDetail.crmOrderDetail;
exports.crmOrderStatuses = crmOrderDetail.crmOrderStatuses;
exports.crmOrderDeliveryServises = crmOrderDetail.crmOrderDeliveryServises;
exports.crmOrderPaySystems = crmOrderDetail.crmOrderPaySystems;
exports.crmOrderTreeConformity = crmOrderDetail.crmOrderTreeConformity;
exports.crmOrderFormDataForSend = crmOrderDetail.crmOrderFormDataForSend;