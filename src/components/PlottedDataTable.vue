<template>
<v-card flat>
  <v-card-title class='pb-0' v-if='allowExport'>
    <div v-if='plottedData.length'>
      <v-tooltip top :close-delay='1'>
        <v-btn slot='activator' outline flat small color='success' @click='downloadPlottedData'>
          <v-icon :left='!isBreakpointSmall'>file_download</v-icon>
          <span class='hidden-md-and-down'>Export CSV</span>
        </v-btn>
        <span>Click to export plotted data to .csv file</span>
      </v-tooltip>
    </div>
  </v-card-title>
  <v-card-text class='pt-1'>
    <v-data-table :headers='headers' :items='plottedData' class='text-xs-center' :rows-per-page-items='[25, 50, 100, { text: "All", value: -1 }]'>
      <template slot='headers' slot-scope='props'>
        <tr>
          <td class='text-xs-left' v-if='plottedData.length'>#</td>
          <td v-for='(header, index) in props.headers' :key='index' class='text-xs-left'>
            {{ header.text }}
          </td>
        </tr>
      </template>

      <template slot='items' slot-scope='props'>
        <td class='text-xs-left'>{{ props.index }}</td>
        <td class='text-xs-left' v-for='(item, index) in fieldnames' :key='index'>
          {{props.item[item]}}
        </td>
      </template>

      <template slot='no-data'>
        <v-alert :value='true' color='error' icon='warning'>
          No data to display.
        </v-alert>
      </template>

      <template slot='footer' v-if='plottedData.length'>
        <tr class='grey lighten-4'>
          <td class='text-xs-left pa-2'>
            <strong>Mean:</strong>
          </td>
          <td v-for='(head, index) in headers' class='text-xs-left pa-2'>
            <span>{{ plottedData | mean(head.value) | format}}</span>
          </td>
        </tr>
        <tr class='grey lighten-4'>
          <td class='text-xs-left pa-2'>
            <strong>SD:</strong>
          </td>
          <td v-for='(head, index) in headers' class='text-xs-left pa-2'>
            <span>{{ plottedData | sd(head.value) | format}}</span>
          </td>
        </tr>
        <tr class='grey lighten-4'>
          <td class='text-xs-left pa-2'>
            <strong>Min:</strong>
          </td>
          <td v-for='(head, index) in headers' class='text-xs-left pa-2'>
            <span>{{ plottedData | min(head.value) | format}}</span>
          </td>
        </tr>
        <tr class='grey lighten-4'>
          <td class='text-xs-left pa-2'>
            <strong>Max:</strong>
          </td>
          <td v-for='(head, index) in headers' class='text-xs-left pa-2'>
            <span>{{ plottedData | max(head.value) | format}}</span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card-text>
</v-card>
</template>

<script>
import * as d3 from 'd3';

import downloadCSV from '../assets/js/downloadCSV';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'PlottedDataTable',
  props: {
    plottedData: {
      type: Array,
      required: true,
    },
    files: {
      required: true,
    },
    allowExport: {
      type: Boolean,
      default: true,
    },
  },
  mixins: [
    downloadCSV,
    isBreakpointSmall,
  ],
  computed: {
    fieldnames() {
      if (this.plottedData.length === 0) return [];
      return Object.keys(this.plottedData[0]);
    },
    headers() {
      // eslint-disable-next-line
      return this.fieldnames.map((key) => (
        {
          align: 'left',
          text: key,
          value: key,
        }),
      );
    },
  },
  filters: {
    mean(data, field) {
      return d3.mean(data, d => parseFloat(d[field]));
    },
    sd(data, field) {
      return d3.deviation(data, d => parseFloat(d[field]));
    },
    min(data, field) {
      return d3.min(data, d => parseFloat(d[field]));
    },
    max(data, field) {
      return d3.max(data, d => parseFloat(d[field]));
    },
    format(value) {
      return typeof value === 'undefined' ? 'N/A' : value.toFixed(2);
    },
  },
  methods: {
    downloadPlottedData() {
      let headers = Object.keys(this.plottedData[0]).join(',');
      headers += '\n';

      const arr = this.plottedData.map(d => Object.values(d));

      this.downloadCSV(arr, headers, 'data.csv');
    },
  },
};

</script>

<style lang='scss'>
table.table thead td:not(:nth-child(1)),
table.table tbody td:not(:nth-child(1)),
table.table thead th:not(:nth-child(1)),
table.table tbody th:not(:nth-child(1)),
table.table thead td:first-child,
table.table tbody td:first-child,
table.table thead th:first-child,
table.table tbody th:first-child {
  padding: 0 5px !important;
}

</style>