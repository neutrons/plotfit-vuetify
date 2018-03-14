<template>
<v-app id='app-container' :dark='$vuetify.dark'>
  <!-- Side Bar Component -->
  <v-sidebar :show='showSidebar' v-show='hide'></v-sidebar>

  <v-navbar @toggle-sidebar='showSidebar = !showSidebar' v-show='hide' />

  <!-- Main Plot Content Here -->
  <v-content>
    <transition name='fade' appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </v-content>

  <v-footer v-show='hide' />

  <!-- Error Message Component -->
  <v-error></v-error>
  <div class='my-tooltip'></div>
</v-app>

</template>

<script>
import ErrorNotification from './components/Error';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    'v-error': ErrorNotification,
    'v-sidebar': Sidebar,
    'v-footer': Footer,
    'v-navbar': Navbar,
  },
  data() {
    return {
      showSidebar: true,
    };
  },
  computed: {
    links() {
      return this.$router.options.routes.slice(2, this.$router.options.routes.length);
    },
    hide() {
      return this.$route.meta.title !== 'Home' && this.$route.meta.title !== 'Edit Chart';
    },
  },
  methods: {
    getTitle() {
      document.title = `ORNL - ${this.$route.meta.title}`;
    },
  },
  watch: {
    $route() {
      this.getTitle();
    },
  },
};
</script>

<style lang='scss'>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.my-tooltip {
  position: absolute;
  padding: 10px;
  height: auto;
  width: auto;
  background: white;
  border: 1px solid black;
  z-index: 9999;
  display: none;
}
</style>
