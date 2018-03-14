<template>
    <v-layout row wrap>
      <!-- Chart container -->
      <v-flex xs12 :id='`quickplot-wrapper-${ID}`' text-xs-center mb-3>
        <svg :class='`chart quickplot-${ID}`' />
      </v-flex>

      <v-flex xs12>
        <v-toolbar flat height='auto'>
          <v-container class='pa-0' fluid>
            <v-layout row wrap class='pa-0'>
              <v-reset-chart-button :disable='plotData.length === 0' @reset-chart='resetChart'></v-reset-chart-button>
              <v-edit-chart-button :disable='plotData.length === 0' ></v-edit-chart-button>
              <v-spacer></v-spacer>
              <v-btn icon @click='show = !show' v-if='Object.keys(browseData).length'>
                <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</v-icon>
              </v-btn>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- data and metadata tabs  -->
      <v-flex xs12 v-if='Object.keys(browseData).length'>
        <v-slide-y-transition>
            <v-tabs v-if='show'>
              <!-- Tabs Bar -->
              <v-tabs-bar>
                <v-tabs-item href='#metadata' ripple v-if='typeof browseData.metadata !== "undefined"'>
                  Metadata
                </v-tabs-item>
                <v-tabs-item href='#data' ripple>
                  Data
                </v-tabs-item>
                <v-tabs-slider color='accent'></v-tabs-slider>
              </v-tabs-bar>

              <v-tabs-items>
                <!-- Plotted Data Table -->
                <v-tabs-content id='data'>
                  <v-card flat>
                    <v-card-text class='tab-card-text'>
                      <v-plotted-data-table :plotted-data='browseData.data || []' :files='[browseData.filename]' />
                    </v-card-text>
                  </v-card>
                </v-tabs-content>

                <v-tabs-content id='metadata'>
                  <v-card-text class='tab-card-text' v-if='typeof browseData.metadata !== "undefined"'>
                    <v-metadata-table :metadata='browseData.metadata || {}'></v-metadata-table>
                  </v-card-text>
                </v-tabs-content>

              </v-tabs-items>
            </v-tabs>
        </v-slide-y-transition>
      </v-flex>

      <v-slide-y-transition>
        <v-delete-point-modal
          :show='showDeleteModal'
          @cancel='resetDeletePoint'
          @delete='confirmDeletePoint'
        ></v-delete-point-modal>
      </v-slide-y-transition>
    </v-layout>
</template>

<script>
// Import Packages
import * as d3 from 'd3';

import chartMethods from './chartMethods';
import deletePoint from '../DeletePoint/DeletePointMixins';

export default {
  name: 'DefaultBrowseChart',
  mixins: [
    chartMethods,
    deletePoint,
  ],
  components: {
    'v-reset-chart-button': () => import('../ResetChartButton'),
    'v-metadata-table': () => import('../MetadataTable'),
    'v-plotted-data-table': () => import('../PlottedDataTable'),
    'v-delete-point-modal': () => import('../DeletePoint/DeletePointModal'),
  },
  data() {
    return {
      xType: 'x',
      yType: 'y',
      width: 960,
      height: 600,
      viewBox: '0 0 960 600',
      show: true,
      defaultMargin: {
        top: 20,
        right: 50,
        bottom: 50,
        left: 100,
      },
    };
  },
  computed: {
    margin() {
      return this.defaultMargin;
    },
    xScale() {
      return d3.scaleLinear()
        .range([0, this.width])
        .domain(this.xExtent)
        .nice();
    },
    xExtent() {
      if (!this.plotData.length) {
        return [0, 0];
      }

      return d3.extent(this.plotData[0].values, d => d.x);
    },
    yScale() {
      return d3.scaleLinear()
        .range([this.height, 0])
        .domain(this.yExtent)
        .nice();
    },
    yExtent() {
      if (!this.plotData.length) {
        return [0, 0];
      }

      return d3.extent(this.plotData[0].values, d => d.y);
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
    line() {
      return d3.line()
        .defined(this.filterForLog)
        .x(d => this.xScale(d.x))
        .y(d => this.yScale(d.y));
    },
    isMetadata() {
      return !(typeof this.plotMetadata === 'undefined');
    },
    metadataLength() {
      if (!this.isMetadata) {
        return 0;
      } else if (this.plotMetadata === null) {
        return 0;
      }

      return Object.keys(this.plotMetadata).length;
    },
  },
  mounted() {
    this.getContainerWidth(`#quickplot-wrapper-${this.ID}`);
    this.drawChart();
  },
  watch: {
    plotData() {
      if (!this.plotData.length) {
        this.getContainerWidth(`#quickplot-wrapper-${this.ID}`);
        this.removeChart();
      }

      this.drawChart();
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

.tab-card-text {
  max-height: 350px;
  overflow-y: auto;
}
</style>