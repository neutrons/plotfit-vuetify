<template>
    <v-navigation-drawer
        :clipped='true'
        v-model='toggle'
        disable-resize-watcher
        disable-route-watcher
        fixed
        app
        hide-overlay
        width='350'
        mobile-break-point='600'
        :dark='$vuetify.theme.name !== "white"'
    >

    <keep-alive>
      <component :is='$route.meta.sidebar'></component>
    </keep-alive>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {
    SidebarSANS1DBrowse: () => import('./SANS/Browse/SidebarSANS1DBrowse'),
    SidebarSANS1DFit: () => import('./SANS/Fit/SidebarSANS1DFit'),
    SidebarSANS1DStitch: () => import('./SANS/Stitch/SidebarSANS1DStitch'),
    SidebarSANS2D: () => import('./SANS/SANS2D/SidebarSANS2D'),
    SidebarTASFit: () => import('./TAS/Fit/SidebarTASFit'),
    SidebarTASBrowse: () => import('./TAS/Browse/SidebarTASBrowse'),
    SidebarTASCombine: () => import('./TAS/Combine/SidebarTASCombine'),
    Sidebar404: () => import('./Sidebar404'),
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    toggle: {
      get() {
        return this.show;
      },
      set() {},
    },
  },
};
</script>

<style lang='scss'>
.chip__close {
  color: black !important;
}
</style>
