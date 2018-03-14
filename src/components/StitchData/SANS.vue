<template>
    <div>
      <keep-alive>
        <v-chart ID='SANS-Stitch'>

          <template slot-scope='props' slot='toolbar-slot'>
            <v-toggle-zoom-brush @toggle-edit='props.toggleEdit' />
            <div v-if='$vuetify.breakpoint.lgAndUp'>
              <v-stitch-btn @stitch-data='props.stitchData' :disable='!isBrushes' />
              <v-remove-brushes-btn @remove-brushes='props.removeBrushes' :disable='!isBrushes' />
              <v-remove-stitch-btn @remove-stitch='props.removeStitchLine' :disable='!stitchedData.length' />
              <v-save-stitch-btn />
              <v-draw-brushes-btn @draw-saved-brushes='props.drawSavedBrushes' :disable='!isBrushesStored || filesToPlot.length < 2' />
            </div>

            <v-menu
              bottom
              v-if='$vuetify.breakpoint.mdAndDown'
              :disabled='props.filesSelected.length < 2'
              :style='`opacity: ${props.filesSelected.length < 2 ? 0.5 : 1}`'>

              <v-btn :icon='$vuetify.breakpoint.mdAndDown' slot='activator' flat small>
                <span class='hidden-md-and-down'>Stitch options</span>
                <v-icon :right='!$vuetify.breakpoint.mdAndDown'>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click='props.stitchData' :disabled='!isBrushes'>
                  <v-list-tile-action>
                    <v-icon>show_chart</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Stitch Data</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click='props.removeBrushes' :disabled='!isBrushes'>
                  <v-list-tile-action>
                    <v-icon>grid_off</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Remove Selections</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click='props.removeStitchLine' :disabled='!stitchedData.length'>
                  <v-list-tile-action>
                    <v-icon>remove</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Remove Stitch</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-save-stitch-btn />
                </v-list-tile>

                <v-list-tile @click='props.drawSavedBrushes' :disabled='!isBrushesStored'>
                  <v-list-tile-action>
                    <v-icon>border_color</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Draw Selections</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </template>

          <template slot-scope='props' slot='tabs-slot'>
            <v-slide-y-transition>
                <v-flex xs12 v-if='props.stitchedData.length' v-show='props.showTabs'>
                    <v-tabs v-model='props.activeParentTab'>

                        <v-tabs-bar v-if='props.stitchedData'>
                            <v-tabs-item href='#tab-fit' ripple v-if='props.stitchedData'>Stitch Results</v-tabs-item>
                            <v-tabs-slider color='accent'></v-tabs-slider>
                        </v-tabs-bar>

                        <!-- nested tab items  -->
                        <v-tabs-items>
                          <!-- fit results tab content -->
                          <v-tabs-content id='tab-fit' ripple v-if='props.stitchedData'>
                            <v-tabs>
                              <v-tabs-bar>
                                <v-tabs-slider color='accent'></v-tabs-slider>
                                <v-tabs-item href='fit-results'>
                                  Selected Regions
                                </v-tabs-item>

                                <v-tabs-item href='fit-data'>
                                  Stitched Data
                                </v-tabs-item>
                              </v-tabs-bar>

                              <v-tabs-items>
                                <v-tabs-content id='fit-results'>
                                  <v-card flat>
                                    <v-card-text class='tab-card-text'>
                                      <v-list>
                                        <template v-for='(item, key, index) in props.brushSelections'>
                                          <v-list-tile :key='index'>
                                            <v-list-tile-avatar>
                                              <v-icon>crop_free</v-icon>
                                            </v-list-tile-avatar>
                                            <v-list-tile-content>
                                              <span class='hidden-sm-and-down'>{{ key }}</span>
                                              <span class='hidden-md-and-up'> {{ index }}</span>
                                            </v-list-tile-content>
                                            <v-list-tile-content>
                                              {{ item.converted[0].toExponential(2) }} : {{ item.converted[1].toExponential(2) }}
                                            </v-list-tile-content>
                                          </v-list-tile>
                                          <v-divider v-if='index < Object.keys(props.brushSelections).length - 1' :key='key'></v-divider>
                                        </template>
                                      </v-list>
                                    </v-card-text>
                                  </v-card>
                                </v-tabs-content>


                                <v-tabs-content id='fit-data'>
                                  <v-card>
                                    <v-card-text class='tab-card-text'>
                                      <v-stitched-data-table :stitched-data='props.stitchedData' :files-stitched='props.filesSelected'></v-stitched-data-table>
                                    </v-card-text>
                                  </v-card>
                                </v-tabs-content>
                                </v-tabs-items>
                            </v-tabs>
                          </v-tabs-content>
                        </v-tabs-items>
                    <!-- end of nested tab items -->
                    </v-tabs>
                </v-flex>
              </v-slide-y-transition>
          </template>

        </v-chart>
      </keep-alive>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import filesToPlotWatcher from '../../assets/js/filesToPlotWatcher';
import read1DData from '../../assets/js/readFiles/default';
import parseData from '../../assets/js//readFiles/parse/SANS1D';

export default {
  name: 'SANS1DStitch',
  mixins: [
    filesToPlotWatcher,
    read1DData,
    parseData,
  ],
  components: {
    'v-chart': () => import('./StitchChart/SANS'),
    'v-toggle-zoom-brush': () => import('../ToggleZoomBrush'),
    'v-stitch-btn': () => import('../StitchButton'),
    'v-remove-brushes-btn': () => import('../RemoveBrushesButton'),
    'v-remove-stitch-btn': () => import('../RemoveStitchButton'),
    'v-save-stitch-btn': () => import('../SaveStitch/SaveStitchSANS'),
    'v-draw-brushes-btn': () => import('../DrawBrushesButton'),
    'v-stitched-data-table': () => import('../StitchedDataTable'),
  },
  computed: {
    ...mapState('SANS/Stitch', {
      filesToPlot: state => state.filesSelected,
      isBrushesStored: state => state.savedBrushes.length,
      stitchedData: state => state.stitchedData,
      isBrushes: state => Object.keys(state.brushSelections).length,
    }),
    ...mapGetters('SANS', [
      'getURLs',
      'getSavedFile',
    ]),
  },
  methods: {
    ...mapMutations('SANS', [
      'storeData',
    ]),
    ...mapMutations('SANS/Stitch', [
      'setCurrentData',
      'resetAll',
    ]),
  },
};
</script>

<style lang='scss' scoped>
.tab-card-text {
  max-height: 350px;
  overflow-y: auto;
}
</style>