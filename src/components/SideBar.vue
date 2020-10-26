<template>
  <!-- Sidebar -->
    <div id="sidebar-container" class="sidebar-expanded d-none d-lg-block col-2">
    <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
    <!-- Bootstrap MainForm Group -->
    <ul class="list-group sticky-top sticky-offset">
      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
        <small>МАГАЗИН</small>
      </li>
      <!-- /END Separator -->



      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-1-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-cube fa-fw mr-3"></span>
          <span class="menu-collapsed">CRM</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-1-inner" class="">
        <router-link  id="crm-item-1" to="#1" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Item</span>
        </router-link>
        <router-link id="crm-item-2" to="#2" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected" >
          <span class="menu-collapsed">Item</span>
        </router-link>
        <router-link to="#3" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected" >
          <span class="menu-collapsed">Item</span>
        </router-link>
      </b-collapse>

      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-2-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-book fa-fw mr-3"></span>
          <span class="menu-collapsed">Каталог</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-2-inner" class="">
        <router-link :to="{ name: 'Brands'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Бренды</span>
       </router-link>
        <router-link :to="{ name: 'CatalogCategory'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Категории</span>
        </router-link>
        <router-link :to="{ name: 'CatalogApplicabilities'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Применимости</span>
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
          <span class="menu-collapsed">Список</span>
        </router-link>
        <router-link to="#4" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Item</span>
        </router-link>
        <router-link to="#5" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Item</span>
        </router-link>
      </b-collapse>

      <router-link class="bg-dark list-group-item list-group-item-action flex-column align-items-start" active-class="item-selected" to="#6">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-usd fa-fw mr-3"></span>
          <span class="menu-collapsed">Заказы</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </router-link>





      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
        <small>ВЕБ КОНТЕНТ</small>
      </li>
      <!-- /END Separator -->

      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-4-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-newspaper-o fa-fw mr-3"></span>
          <span class="menu-collapsed">Новости</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-4-inner" class="">
        <router-link :to="{ name: 'NewsArticles'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Статьи</span>
        </router-link>
        <router-link :to="{ name: 'NewsCategory'}" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Категории</span>
        </router-link>

      </b-collapse>

      <a v-b-toggle.collapse-5-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-file-code-o fa-fw mr-3"></span>
          <span class="menu-collapsed">Страницы</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-5-inner" class="">
        <router-link to="#8" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">О нас</span>
        </router-link>
        <router-link to="#9" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">За вас</span>
        </router-link>
        <router-link to="#10" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">За тех кто в море</span>
        </router-link>
      </b-collapse>


      <!-- Menu with submenu -->
      <a v-b-toggle.collapse-6-inner  class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span class="fa fa-wrench fa-fw mr-3"></span>
          <span class="menu-collapsed">Настройки</span>
          <span class="submenu-icon ml-auto"></span>
        </div>
      </a>

      <!-- Submenu content -->
      <b-collapse id="collapse-6-inner" class="">
        <router-link to="#11" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Категории</span>
        </router-link>
        <router-link to="#12" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Категории2</span>
        </router-link>
        <router-link to="#13" class="list-group-item list-group-item-action bg-dark text-white" active-class="item-selected">
          <span class="menu-collapsed">Категории3</span>
        </router-link>
      </b-collapse>





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
      <a href="#" data-toggle="sidebar-colapse" class="bg-dark list-group-item list-group-item-action d-flex align-items-center">
        <div class="d-flex w-100 justify-content-start align-items-center">
          <span id="collapse-icon" class="fa fa-2x mr-3"></span>
          <span id="collapse-text" class="menu-collapsed">Collapse</span>
        </div>
      </a>
      <!-- Logo -->
      <li class="list-group-item logo-separator d-flex justify-content-center">
        <img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="30" height="30">
      </li>
    </ul>
    <!-- MainForm Group END-->
  </div>
  <!-- sidebar-container END -->

</template>

<script>
export default {
name: "SideBar",

  data(){
    return{
      isActiveItem:null,
    }
  },
  methods:{
    setActiveItem(evt) {
      this.isActiveItem = evt.currentTarget.id;
    }
  },

}


</script>

<style>

#body-row {
  margin-left:0;
  margin-right:0;
}
#sidebar-container {
  min-height: 100vh;
  background-color: #333;
  padding: 0;
}

/* Sidebar sizes when expanded and expanded */
.sidebar-expanded {
  width: 230px;
}
.sidebar-collapsed {
  width: 60px;
}

/* Menu item*/
#sidebar-container .list-group a {
  height: 50px;
  color: white;
}

/* Submenu item*/
#sidebar-container .list-group .sidebar-submenu a {
  height: 45px;
  padding-left: 30px;
}
.sidebar-submenu {
  font-size: 0.9rem;
}

/* Separators */
.sidebar-separator-title {
  background-color: #333;
  height: 35px;
}
.sidebar-separator {
  background-color: #333;
  height: 25px;
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


.item-selected {
  background-color: rgba(86, 122, 213, 1) !important;
  box-shadow: 5px 5px 1px 0px rgba(0,0,0,0.75);
  z-index: 2;
}



.item-not-selected{
  background-color: black;
}

</style>
