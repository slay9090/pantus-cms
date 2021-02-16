<template>

  <div id="sidebar-container-small" class="sidebar-expanded ">
    <!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
    <!-- Bootstrap edit Group -->
    <ul class="list-group sticky-top sticky-offset">
      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
<!--        <small>МАГАЗИН</small>-->
      </li>
      <!-- /END Separator -->

      <!-- Menu with submenu -->
      <items-menu
          name-item="CRM"
          collapse-icon
          v-b-toggle.collapse-crm
      >
        <template #itemicon>
          <span class="fa fa-cube fa-fw icon-size"></span>
        </template>
      </items-menu>

      <!-- Submenu content -->
      <b-collapse id="collapse-crm" class="">

        <items-menu
            name-item="Заказы"
            name-router="Orders"
            active-item

        >
          <template #itemicon> <span class="fa fa-shopping-cart fa-fw icon-size"></span> </template>
        </items-menu>

        <items-menu
            name-item="Корзина"
        >
          <template #itemicon>
            <span class="fa fa-shopping-bag fa-fw icon-size"></span>
          </template>
        </items-menu>

      </b-collapse>

      <!-- Menu with submenu -->

      <items-menu
          name-item="Каталог"
          collapse-icon
          v-b-toggle.collapse-catalog
      >
        <template #itemicon>
          <span class="fa fa-book fa-fw icon-size"></span>
        </template>
      </items-menu>

      <!-- Submenu content -->
      <b-collapse id="collapse-catalog" >

        <items-menu
            name-item="Бренды"
            name-router="Brands"
            active-item
        >
          <template #itemicon> <span class="fa fa-tags fa-fw icon-size"></span> </template>
        </items-menu>

        <items-menu
            name-item="Категории"
            name-router="CatalogCategory"
            active-item
        >
          <template #itemicon> <span class="fa fa-th-list fa-fw icon-size"></span> </template>
        </items-menu>

        <items-menu
            name-item="Применяемости"
            name-router="CatalogApplicabilities"
            active-item
        >
          <template #itemicon> <span class="fa fa-car fa-fw icon-size"></span> </template>
        </items-menu>

      </b-collapse>

      <!-- Menu with submenu -->

      <items-menu
          name-item="Продукты"
          collapse-icon
          v-b-toggle.collapse-product
      >
        <template #itemicon>
          <span class="fa fa-database fa-fw icon-size"></span>
        </template>
      </items-menu>

      <!-- Submenu content -->
      <b-collapse id="collapse-product" >

        <items-menu
            name-item="Автозапчасти"
            name-router="ProductsList"
            active-item
        >
          <template #itemicon> <span class="fa fa-cogs fa-fw icon-size"></span> </template>
        </items-menu>

      </b-collapse>



      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">

      </li>
      <!-- /END Separator -->

      <!-- Menu with submenu -->
      <items-menu
          name-item="Новости"
          collapse-icon
          v-b-toggle.collapse-news
      >
        <template #itemicon>
          <span class="fa fa-paper-plane-o fa-fw icon-size"></span>
        </template>
      </items-menu>

      <!-- Submenu content -->
      <b-collapse id="collapse-news" >

        <items-menu
            name-item="Статьи"
            name-router="NewsArticles"
            active-item
        >
          <template #itemicon> <span class="fa fa-list-alt fa-fw icon-size"></span> </template>
        </items-menu>

        <items-menu
            name-item="Категории"
            name-router="NewsCategory"
            active-item
        >
          <template #itemicon> <span class="fa fa-th-list fa-fw icon-size"></span> </template>
        </items-menu>

      </b-collapse>


      <items-menu
          name-item="Страницы"
          collapse-icon
          v-b-toggle.collapse-page
      >
        <template #itemicon>
          <span class="fa fa-file-code-o fa-fw icon-size"></span>
        </template>
      </items-menu>



      <!-- Menu with submenu -->
      <items-menu
          name-item="Настройки"
          collapse-icon
          v-b-toggle.collapse-settings
      >
        <template #itemicon>
          <span class="fa fa-wrench fa-fw icon-size"></span>
        </template>
      </items-menu>



      <!-- Menu with submenu -->
      <items-menu
          name-item="Отзывы"
          collapse-icon
          v-b-toggle.collapse-comments
      >
        <template #itemicon>
          <span class="fa fa-comments fa-fw icon-size"></span>
        </template>
      </items-menu>




      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
<!--        <small>SEO</small>-->
      </li>
      <!-- /END Separator -->

      <items-menu
          name-item="Статистика"
          collapse-icon
          v-b-toggle.statistic
      >
        <template #itemicon>
          <span class="fa fa-line-chart fa-fw icon-size"></span>
        </template>
      </items-menu>

      <!-- Submenu content -->
      <b-collapse id="statistic" >

        <items-menu
            name-item="Яндекс"
            name-router="statisticYandex"
            active-item
        >
          <template #itemicon> <span class="fa fa-yahoo fa-fw icon-size"></span> </template>
        </items-menu>

        <items-menu
            name-item="Google"
            name-router="statisticGoogle"
            active-item
        >
          <template #itemicon> <span class="fa fa-google fa-fw icon-size"></span> </template>
        </items-menu>

      </b-collapse>





      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
<!--        <small>СЕРВИСЫ</small>-->
      </li>
      <!-- /END Separator -->



      <items-menu
          name-item="Messages"
          v-b-toggle.collapse-messages
      >
        <template #itemicon>
          <span class="fa fa-envelope-o fa-fw icon-size"></span>
          <span class="badge badge-pill badge-primary badge-size">5</span>
        </template>
      </items-menu>

      <items-menu
          name-item="Calendar"
          v-b-toggle.collapse-calendar
      >
        <template #itemicon>
          <span class="fa fa-calendar fa-fw icon-size"></span>
        </template>
      </items-menu>


      <!-- Separator with title -->
      <li class="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed"></li>
      <!-- /END Separator -->


      <items-menu
          name-item="Help"
          name-router="Test"
          active-item
      >
        <template #itemicon>
          <span class="fa fa-question-circle fa-fw icon-size"></span>
        </template>
      </items-menu>


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

#sidebar-container-small {
  min-height: 100vh;
  background-color: #333;
  padding: 0;
}
/* Sidebar sizes when expanded and expanded */
.sidebar-expanded {
  width: 100px;
}
/* Menu item*/
#sidebar-container-small .list-group a {
  color: white;
}

/* Submenu item*/
#sidebar-container-small .list-group .sidebar-submenu a {
  height: 45px;
  padding-left: 30px;
}

/* Separators */
.sidebar-separator-title {
  padding-top: 0;
  padding-bottom: 0;
  background-color: #333;
  height: 15px;
}

a.bg-dark:focus, a.bg-dark:hover{
  background-color: rgba(86, 122, 213, 0.5) !important;
}

.icon-size {
  font-size: 1.3rem !important;
}

.badge-size {
  font-size: 0.6rem;
  position: absolute;
}




</style>