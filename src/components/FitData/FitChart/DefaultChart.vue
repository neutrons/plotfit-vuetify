<template>
<v-container fluid pa-0>
  <v-flex xs12>
      <v-tabs>

        <!-- Tabs Bar -->
        <v-tabs-bar>
          <v-tabs-item href='#plot' ripple>
            Plot
          </v-tabs-item>
          <v-tabs-item href='#data-table' ripple>
            Data Table
          </v-tabs-item>
          <v-tabs-slider color='accent'></v-tabs-slider>
        </v-tabs-bar>

        <!-- First level of tab items  -->
        <v-tabs-items>
          <v-tabs-content id='plot'>
            <v-layout row wrap>

              <!-- Chart container -->
              <v-flex xs12 :id='`fit-chart-wrapper-${ID}`' text-xs-center mb-3>
                <svg :class='`chart fit-chart fit-chart-${ID}`' />
              </v-flex>

              <v-flex xs12>
                <v-toolbar height='auto' flat>
                  <v-container class='pa-0' fluid>
                    <v-layout row wrap class='pa-0'>
                      <v-reset-chart-button @reset-chart='resetChart' :disable='filesSelected.length === 0'></v-reset-chart-button>
                      <v-edit-chart-button :disable='filesSelected.length === 0' ></v-edit-chart-button>

                      <v-spacer></v-spacer>
                      <!-- scatter point hover values -->
                      <v-subheader class='hidden-sm-and-down' v-if='filesSelected.length > 0 && xPoint'>
                        <span class='mr-2'>X: {{xPoint.toExponential(2)}}</span>
                        <span class='mr-2'>Y: {{yPoint.toExponential(2)}}</span>
                        <span class='mr-2'>Error: {{errorPoint.toExponential(2)}}</span>
                      </v-subheader>
                      <v-spacer></v-spacer>
                      <v-btn icon flat @click='showTabs = !showTabs' v-if='fileToFit || metadataLength > 0'>
                        <v-icon small>{{ showTabs ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-container>
                </v-toolbar>
              </v-flex>

              <slot name='tabs-slot' v-if='ID === "SANS-Fit"'
                :show-tabs='showTabs'
                :file-to-fit='fileToFit'
                :fitted-data='fittedData'
                :x-scale='xScale'
                :active-parent-tab='activeParentTab'
              ></slot>
              <slot name='tabs-slot' v-if='ID === "TAS-Fit"'
                :show-tabs='showTabs'
                :file-to-fit='fileToFit'
                :fitted-data='fittedData'
                :x-scale='xScale'
                :active-parent-tab='activeParentTab'
                :metadata='metadata'
                :metadata-length='metadataLength'
              ></slot>
            </v-layout>
          </v-tabs-content>

          <!-- Plotted Data Table -->
          <v-tabs-content id='data-table'>
            <v-card flat>
              <v-card-text>
                <v-plotted-data-table :plotted-data='plottedData' :files='filesSelected' />
              </v-card-text>
            </v-card>
          </v-tabs-content>

        </v-tabs-items>
      </v-tabs>
  </v-flex>

  <!-- Modal Picker for Fit Initial Values -->
  <v-slide-y-transition>
    <v-flex xs12 :class='`modal-picker modal-picker-${ID}`' v-if='showPicker'>
      <v-flex xs4 offset-xs4>
        <v-card class='mt-5 text-xs-center'>
          <v-card-title class='primary pl-3 pt-1 pb-1 pr-0 white--text'>
              <div class='headline'>Select Initial Value</div>
              <v-spacer></v-spacer>
              <v-btn icon flat small dark class='error white--text' @click='showPicker = false'>
                <v-icon>close</v-icon>
              </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12>
                <v-btn flat outline @click='selectPickerPoints(pickerPoints[0])'>
                  Select X: <span :class='`pl-2`'>{{ pickerPoints[0].toFixed(2) }}</span>
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-btn flat outline @click='selectPickerPoints(pickerPoints[1])'>
                  Select Y: <span :class='`pl-2`'>{{ pickerPoints[1].toFixed(2) }}</span>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-flex>
  </v-slide-y-transition>
</v-container>
</template>

<script>
// Import Packages
import * as d3 from 'd3';
import { eventBus } from '../../../assets/js/eventBus';
import chartMethods from './chartMethods';

export default {
  name: 'Chart',
  props: {
    ID: {
      type: String,
      required: true,
    },
  },
  mixins: [
    chartMethods,
  ],
  components: {
    'v-reset-chart-button': () => import('../../ResetChartButton'),
    'v-plotted-data-table': () => import('../../PlottedDataTable'),
  },
  data() {
    return {
      svg: undefined,
      g: undefined,
      drawerRight: false,
      showTabs: true,
      width: 960,
      height: 600,
      viewBox: '0 0 960 600',
      defaultMargin: {
        top: 20,
        right: 50,
        bottom: 50,
        left: 100,
      },
      sliderMargin: {
        top: 50,
        right: 50,
        bottom: 130,
        left: 100,
      },
      sliderHeight: 25,
      showPicker: false,
      pickerPoints: [0, 0],
    };
  },
  computed: {
    margin() {
      if (this.fileToFit) {
        return this.sliderMargin;
      }

      return this.defaultMargin;
    },
    plotData() {
      return this.chartConfigurations.data;
    },
    xScale() {
      return this.plotScale.x.value
        .range([0, this.width])
        .domain(this.xExtent)
        .nice();
    },
    yScale() {
      return this.plotScale.y.value
        .range([this.height, 0])
        .domain(this.yExtent)
        .nice();
    },
    yType() {
      return this.plotScale.y.label;
    },
    xType() {
      return this.plotScale.x.label;
    },
    colorScale() {
      return d3.scaleOrdinal(d3.schemeCategory20)
        .domain(this.plotData.map(d => d.key));
    },
    xAxis() {
      return d3.axisBottom(this.xScale);
    },
    yAxis() {
      return d3.axisLeft(this.yScale);
    },
    xGrid() {
      return d3.axisBottom(this.xScale)
        .ticks(10)
        .tickSize(-this.height)
        .tickFormat('');
    },
    yGrid() {
      return d3.axisLeft(this.yScale)
        .ticks(10)
        .tickSize(-this.width)
        .tickFormat('');
    },
    xExtent() {
      return this.getExtent('x');
    },
    yExtent() {
      return this.getExtent('y');
    },
    line() {
      return d3.line()
        .defined(this.filterForLog)
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y));
    },
    isMetadata() {
      return !(typeof this.metadata === 'undefined');
    },
    metadataLength() {
      if (!this.isMetadata) {
        return 0;
      } else if (this.metadata === null) {
        return 0;
      }

      return Object.keys(this.metadata).length;
    },
  },
  methods: {
    selectPickerPoints(value) {
      this.showPicker = false;
      this.togglePickArea(false);
      eventBus.$emit(`update-initial-value-pick-${this.$route.meta.group}`, value);
    },
    togglePickArea(value) {
      this.svg.select('.pick-area')
        .style('visibility', value ? 'visible' : 'hidden');

      this.svg.select('.tooltip')
        .style('opacity', value ? 1 : 0);

      // Disable brush to prevent fitting data
      this.svg.select('.brush').style('pointer-events', value ? 'none' : 'all');

      if (!value) this.pickerPoints = [0, 0];
    },
  },
  mounted() {
    eventBus.$on(`toggle-pick-area-${this.$route.meta.group}`, this.togglePickArea);

    this.getContainerWidth(`#fit-chart-wrapper-${this.ID}`);
    this.drawChart();
  },
  destroyed() {
    eventBus.$off(`toggle-pick-area-${this.$route.meta.group}`);
  },
  watch: {
    chartConfigurations: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          if (this.filesSelected.length === 0 || this.fileToFit !== this.previousFit) {
            this.showTabs = true;
            this.removeChart();
            this.getContainerWidth(`#fit-chart-wrapper-${this.ID}`);
            this.drawChart();
          } else {
            this.drawChart();
          }
        });
      },
    },
  },
};

</script>

<style lang='scss'>
.axis {
  path {
    shape-rendering: optimizeQuality;
  }
  .tick text {
    font-size: 14px;
    fill: black;
  }
  .tick line {
    shape-rendering: optimizeQuality;
    stroke: black;
  }
}

.grid .tick line {
  shape-rendering: optimizeQuality;
  stroke: gainsboro;
}

iframe.width-changed {
  width: 100%;
  display: block;
  border: 0;
  height: 0;
  margin: 0;
}

.chart {
  // Extra small screen (mobile)
  @media screen and (max-width: 599px) {
    max-height: 500px / 1.77px;
    max-width: 500px;
  } // Small screen (tablet)
  @media screen and (min-width: 600px) and (max-width: 959px) {
    max-height: 800px / 1.77px;
    max-width: 800px;
  } // Medium screen (laptop)
  @media screen and (min-width: 960px) and (max-width: 1263px) {
    max-height: 1000px / 1.77px;
    max-width: 1000px;
  } // Large screen (desktop)
  @media screen and (min-width: 1264px) and (max-width: 1903px) {
    max-height: 1000px / 1.77px;
    max-width: 1000px;
  } // Extra large screen (ultrawide)
  @media screen and (min-width: 1904px) {
    max-height: 1800px / 1.77px;
    max-width: 1800px;
  }
}

/* Override MathJax positioning for rendered elements */
.MathJax_SVG {
  position: static !important;
  display: inline-block !important;
}

foreignObject {
  height: 100px;
  width: 200px;
}

.handle {
  fill: gray;
  opacity: 0.75;
}

.zoom-group {
  .brush-container .handle {
    fill: none;
  }

  .brushes .selection {
    fill: green;
    stroke: black;
    stroke-width: 1px;
    stroke-dasharray: 3px 3px;
  }

  .brushes .handle {
    fill: none;
  }

  .brushes text {
    fill: white;
    text-anchor: end;
    letter-spacing: 1px;
  }
}

/* Modal Picker Styles */
   /* The Modal (background) */
.modal-picker {
  position: absolute; /* Stay in place */
  z-index: 999999; /* Sit on top */
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
</style>
