<template>
  <v-toolbar
    fixed
    app
    dense
    class='elevation-1'
    :clipped-left='true' :clipped-right='true'
    color='secondary'
    :dark='!$vuetify.dark'>

    <v-toolbar-side-icon @click.stop='$emit("toggle-sidebar")' class='ml-3 mr-3'>
      <v-icon>fa-sliders</v-icon>
    </v-toolbar-side-icon>

    <!-- bread crumb component -->
    <v-breadcrumbs>
      <v-icon slot='divider'>chevron_right</v-icon>
      <v-breadcrumbs-item 
        v-for='(item, key) in $route.meta.breadcrumb' :key='key'
        :to='item.href'
        :disabled='item.disabled'
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-fetch-data></v-fetch-data>
      <v-upload-data></v-upload-data>
    </v-toolbar-items>

    <v-toolbar-items class='hidden-sm-and-down'>
      <v-btn flat exact to='/HomePage'>Home</v-btn>
      <v-menu bottom left open-on-hover>
        <v-btn flat slot='activator'>
          SANS
          <v-icon right>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to='/SANS/Browse' exact :active-class='activeClass'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/SANS/Fit' exact :active-class='activeClass'>
            <v-list-tile-title>Graph Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/SANS/Stitch' exact :active-class='activeClass'>
            <v-list-tile-title>Stitch Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/SANS/SANS2D' exact :active-class='activeClass'>
            <v-list-tile-title>SANS2D</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu bottom left open-on-hover>
        <v-btn flat slot='activator'>
          TAS
          <v-icon right>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to='/TAS/Browse' exact :active-class='activeClass'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/TAS/Fit' exact :active-class='activeClass'>
            <v-list-tile-title>Graph Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/TAS/Combine' exact :active-class='activeClass'>
            <v-list-tile-title>Combine Data</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <v-menu offset-y bottom class='hidden-md-and-up'>
        <v-btn flat icon slot='activator'>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile exact to='/HomePage' :active-class='activeClass'>Home</v-list-tile>
          <v-list-tile>
            <v-menu offset-x open-on-hover>
              <v-list-tile slot='activator'>
                <v-list-tile-title>SANS</v-list-tile-title>
                <v-list-tile-action class='justify-end'>
                  <v-icon>play_arrow</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list dense>
                <v-list-tile to='/SANS/Browse' exact :active-class='activeClass'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/SANS/Fit' exact :active-class='activeClass'>
                  <v-list-tile-title>Graph Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/SANS/Stitch' exact :active-class='activeClass'>
                  <v-list-tile-title>Stitch Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/SANS/SANS2D' exact :active-class='activeClass'>
                  <v-list-tile-title>SANS2D</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile>
          <v-list-tile>
            <v-menu offset-x open-on-hover>
              <v-list-tile slot='activator'>
                <v-list-tile-title>TAS</v-list-tile-title>
                <v-list-tile-action class='justify-end'>
                  <v-icon>play_arrow</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list dense>
                <v-list-tile to='/TAS/Browse' exact :active-class='activeClass'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/TAS/Fit' exact :active-class='activeClass'>
                  <v-list-tile-title>Graph Data</v-list-tile-title>
                </v-list-tile>
              </v-list>

              <v-list-tile to='/TAS/Combine' exact :active-class='activeClass'>
                <v-list-tile-title>Combine Data</v-list-tile-title>
              </v-list-tile>
            </v-menu>
          </v-list-tile>
        </v-list>
      </v-menu>
  </v-toolbar>
</template>

<script>
import FetchData from './FetchData';
import UploadData from './UploadData/UploadData';

export default {
  name: 'Navbar',
  components: {
    'v-fetch-data': FetchData,
    'v-upload-data': UploadData,
  },
  computed: {
    activeClass() {
      switch (this.$vuetify.theme.name) {
        case 'white':
          return 'my-active-white';
        case 'blue':
          return 'my-active-blue';
        default:
          return 'my-active-green';
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.my-active-green {
  color: white;
  font-weight: bold;
  background: #00C853 !important;
}

.my-active-white {
  color: white;
  font-weight: bold;
  background: grey !important;
}

.my-active-blue {
  color: white;
  font-weight: bold;
  background: #00b0ff !important;
}
</style>