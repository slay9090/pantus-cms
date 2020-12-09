<template>

  <div id="sidebar-container" class="sidebar-expanded ">
    <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
    <!-- Bootstrap edit Group -->
    <ul class="list-group sticky-top sticky-offset">
      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
<!--        <small>МАГАЗИН</small>-->
      </li>
      <!-- /END Separator -->


      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-1-inner  class="sidebar-expanded_link bg-dark list-group-item list-group-item-action d-block">

<!--        <b-container class="my-0 mx-0 px-0 py-0 " >-->
<!--          <b-row  align-h="center">-->
<!--            <b-col cols="auto" class="px-0">-->
<!--              <span  class="fa fa-cube fa-fw icon-size"></span>-->

<!--            </b-col>-->

<!--          </b-row>-->
<!--          <b-rows  class="px-0">-->
<!--            <b-col  cols="auto" class="px-0 d-flex align-items-center align-content-center justify-content-center">-->
<!--              <small class="text-icon-descriptions" >CRM <span class="submenu-icon"> </span></small>-->
<!--            </b-col>-->
<!--          </b-rows>-->

<!--        </b-container>-->

        <items-menu
            name-item="CRM"
        >

                    <template #itemicon>
                      <span  class="fa fa-cube fa-fw icon-size"></span>
                    </template>
        </items-menu>







      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-1-inner" class="">

        <router-link class="sidebar-expanded_link bg-dark list-group-item list-group-item-action"
                     active-class="item-selected" to="#6">
          <b-container class="my-0 mx-0 px-0 py-0 ">
            <b-row align-h="center">
              <b-col cols="auto" class="px-0"><span class="fa fa-usd fa-fw icon-size"></span></b-col>
            </b-row>
            <b-row align-h="center">
              <b-col cols="auto" class="px-0 d-flex align-items-center align-content-center justify-content-center">
                <small class="text-icon-descriptions">Заказы</small>
              </b-col>
            </b-row>
          </b-container>
        </router-link>

        <router-link class=" sidebar-expanded_link bg-dark list-group-item list-group-item-action flex-column align-items-start" active-class="item-selected" to="#16">
          <div class="d-flex w-100 justify-content-start align-items-center">
            <span class="fa fa-shopping-bag fa-fw pl-4 ml-3 mr-4"></span>
            <span class="menu-collapsed ml-2">Корзины</span>
          </div>
        </router-link>
      </b-collapse>

      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-2-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-book fa-fw mr-3"></span>
          <span class="menu-collapsed ">Каталог</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-2-inner" class="">
        <router-link :to="{ name: 'Brands'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="fa fa-tags fa-fw pl-4 ml-3 mr-4"></span>
          <span class="menu-collapsed ml-2">Бренды</span>

        </router-link>
        <router-link :to="{ name: 'CatalogCategory'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="fa fa-th-list fa-fw pl-4 ml-3 mr-4"></span>
          <span class="menu-collapsed ml-2">Категории</span>
        </router-link>
        <router-link :to="{ name: 'CatalogApplicabilities'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="fa fa-car fa-fw pl-4 ml-3 mr-4"></span>
          <span class="menu-collapsed ml-2">Применимости</span>
        </router-link>
      </b-collapse>

      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-3-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-database fa-fw mr-3"></span>
          <span class="menu-collapsed">Продукты</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-3-inner" class="">
        <router-link :to="{ name: 'ProductsList'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="fa fa-cogs fa-fw pl-4 ml-3 mr-4"></span>
          <span class="menu-collapsed ml-2">Автозапчасти</span>
        </router-link>

      </b-collapse>







      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
        <small>ВЕБ КОНТЕНТ</small>
      </li>
      <!-- /END Separator -->

      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-4-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-paper-plane-o fa-fw mr-3"></span>
          <span class="menu-collapsed">Новости</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-4-inner" class="">
        <router-link :to="{ name: 'NewsArticles'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="fa fa-list-alt fa-fw pl-4 ml-3 mr-4"></span>
          <span class="menu-collapsed ml-2">Статьи</span>
        </router-link>
        <router-link :to="{ name: 'NewsCategory'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="fa fa-th-list fa-fw pl-4 ml-3 mr-4"></span>
          <span class="menu-collapsed ml-2">Категории</span>
        </router-link>

      </b-collapse>

      <a v-b-toggle.collapse-5-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-file-code-o fa-fw mr-3"></span>
          <span class="menu-collapsed">Страницы</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>




      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-6-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-wrench fa-fw mr-3"></span>
          <span class="menu-collapsed">Настройки</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>




      <a href="#" class="bg-dark list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-comments fa-fw mr-3"></span>
          <span class="menu-collapsed">Отзывы</span>
        </div>
      </a>

      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
        <small>SEO</small>
      </li>
      <!-- /END Separator -->

      <a href="#" class="bg-dark list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-line-chart fa-fw mr-3"></span>
          <span class="menu-collapsed">Статистика</span>
        </div>
      </a>

      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
        <small>СЕРВИСЫ</small>
      </li>
      <!-- /END Separator -->


      <a href="#" class="bg-dark list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-envelope-o fa-fw mr-3"></span>
          <span class="menu-collapsed">Messages <span class="badge badge-pill badge-primary ml-2">5</span></span>
        </div>
      </a>

      <a href="#" class="bg-dark list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-calendar fa-fw mr-3"></span>
          <span class="menu-collapsed">Calendar</span>
        </div>
      </a>


      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed"></li>
      <!-- /END Separator -->


      <router-link :to="{ name: 'Test'}" class="bg-dark list-group-item list-group-item-action" active-class="item-selected">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-question fa-fw mr-3"></span>
          <span class="menu-collapsed">Help</span>
        </div>
      </router-link>

      <!-- Logo -->
      <li class="list-group-item logo-separator d-flex justify-content-center">
        <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30">
      </li>
    </ul>
    <!-- edit Group END-->
  </div>

</template>

<script>
import ItemsMenu from "@/components/navigations/side-bar/small/items-menu";
export default {
name: "sidebar-small",
  components: {ItemsMenu}
}
</script>

<style scoped>

#sidebar-container {
  min-height: 100vh;
  background-color: #333;
  padding: 0;
}

/* Sidebar sizes when expanded and expanded */
.sidebar-expanded {
  width: 100px;
}


/* Menu item*/
#sidebar-container .list-group a {

  color: white;
}

/* Submenu item*/
#sidebar-container .list-group .sidebar-submenu a {
  height: 45px;
  padding-left: 30px;
}


/* Separators */
.sidebar-separator-title {
  background-color: #333;
  height: 35px;
}

.logo-separator {
  background-color: #333;
  height: 60px;
}

/* Closed submenu icon */
#sidebar-container .list-group .list-group-item[aria-expanded="false"] .submenu-icon::after {
  content: " \f0d7";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}
/* Opened submenu icon */
#sidebar-container .list-group .list-group-item[aria-expanded="true"] .submenu-icon::after {
  content: " \f0da";
  font-family: FontAwesome;
  display: inline;
  text-align: right;
  padding-left: 10px;
}


a.bg-dark:focus, a.bg-dark:hover, button.bg-dark:focus, button.bg-dark:hover {
  background-color: rgba(86, 122, 213, 0.5) !important;
}

.text-icon-descriptions {
  font-size: 0.6rem;
}
.icon-size {
  font-size: 1.3rem;
}
.sidebar-expanded_link {
  padding-bottom: 5px;
  padding-top: 5px;
}

</style>