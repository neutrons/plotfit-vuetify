<template>
<v-container>
  <v-layout row>
    <div style='position: absolute; left: 50px; top: 50px; bottom: 50px; right: 50px;'>
      <v-card raised height='100%'>
        <v-card-title class='title secondary white--text'>Edit chart</v-card-title>
        <v-card-text>
          <div id='plotly-chart' style='width: 100%;'></div>
        </v-card-text>
      </v-card>
    </div>
  </v-layout>
</v-container>
</template>

<script>
import Plotly from 'plotly.js';

export default {
  name: 'EditChart',
  mounted() {
    let editData = this.$route.query.editChartData;
    editData = JSON.parse(editData);

    // SET UP PLOTLY
    const d3 = Plotly.d3;
    const WIDTH_IN_PERCENT_OF_PARENT = 100;
    const HEIGHT_IN_PERCENT_OF_PARENT = 50;
    // This makes the plot responsive
    const gd3 = d3.select('#plotly-chart')
      .style({
        width: `${WIDTH_IN_PERCENT_OF_PARENT}%`,
        'margin-left': `${(100 - WIDTH_IN_PERCENT_OF_PARENT) / 2} %`,

        height: `${HEIGHT_IN_PERCENT_OF_PARENT}vh`,
        'margin-top': 0,
      });

    const gd = gd3.node();

    // CREATE PLOT DATA
    const data = this.packData(editData.data);

    const layout = {
      title: 'Click Here<br>to Edit Chart Title',
      xaxis: {
        title: editData.labels.x,
        type: editData.axis.x,
      },
      yaxis: {
        title: editData.labels.y,
        type: editData.axis.y,
      },
    };

    Plotly.plot(gd, data, layout, { editable: true, showLink: true, linkText: 'Edit chart in Plotly' });

    window.onresize = () => {
      Plotly.Plots.resize(gd);
    };
  },
  beforeDestroy() {
    window.onresize = null;
  },
  methods: {
    packData(data) {
      const temp = [];

      data.forEach((d) => {
        temp.push({
          ...d,
          mode: 'lines+markers',
          type: 'scatter',
        });
      });

      return temp;
    },
  },
};
</script>