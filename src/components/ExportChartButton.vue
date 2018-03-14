<template>
<v-tooltip top :close-delay='1' :disabled='disable'>
    <v-btn slot='activator' flat small @click='savePlot' :disabled='disable' :icon='isBreakpointSmall'>
      <span class='hidden-md-and-down'>Export Plot</span>
      <v-icon :right='!isBreakpointSmall'>fa-floppy-o</v-icon>
    </v-btn>
    <span>Click to export plot to .png</span>
</v-tooltip>
</template>

<script>
import * as d3 from 'd3';
import { saveAs } from 'file-saver';
import isBreakpointSmall from '../assets/js/isBreakpointSmall';

export default {
  name: 'ExportChartButton',
  mixins: [
    isBreakpointSmall,
  ],
  props: {
    disable: {
      type: Boolean,
      default: false,
    },
    ID: {
      type: String,
      required: true,
    },
    selection: {
      type: String,
      required: true,
    },
  },
  methods: {
    getSVG() {
      return d3.select(this.selection);
    },
    save(dataBlob) {
      const date = new Date();
      const filename = `${this.ID}_chart_${date.getMonth() + 1}_${date.getDate()}_${date.getFullYear()}`;
      saveAs(dataBlob, filename);
    },
    savePlot() {
      // Set-up the export button
      const svg = this.getSVG();
      const svgString = this.getSVGString(svg.node());

      this.svgString2Image(svgString, 960, 500, 'png', this.save); // passes Blob and filesize String to the callback
    },
    getSVGString(svgNode) {
      svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
      const cssStyleText = this.getCSSStyles(svgNode);

      this.appendCSS(cssStyleText, svgNode);

      const serializer = new XMLSerializer();
      let svgString = serializer.serializeToString(svgNode);

      svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
      svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

      return svgString;
    },
    svgString2Image(svgString, width, height, format = 'png', callback) {
      const imgsrc = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`; // Convert SVG string to data URL
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      canvas.width = width;
      canvas.height = height;

      const image = new Image();
      image.onload = () => {
        context.clearRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        canvas.toBlob((blob) => {
          const filesize = `${Math.round(blob.length / 1024)} KB`;
          if (callback) callback(blob, filesize);
        });
      };

      image.src = imgsrc;
    },
    getCSSStyles(parentElement) {
      const selectorTextArr = [];

      // Add Parent element Id and Classes to the list
      selectorTextArr.push(`'#${parentElement.id}`);
      for (let c = 0; c < parentElement.classList.length; c += 1) {
        if (!this.contains(`.${parentElement.classList[c]}`, selectorTextArr)) {
          selectorTextArr.push(`.${parentElement.classList[c]}`);
        }
      }

      // Add Children element Ids and Classes to the list
      const nodes = parentElement.getElementsByTagName('*');
      for (let i = 0; i < nodes.length; i += 1) {
        const id = nodes[i].id;
        if (!this.contains(`#${id}`, selectorTextArr)) {
          selectorTextArr.push(`#${id}`);
        }

        const classes = nodes[i].classList;
        for (let c = 0; c < classes.length; c += 1) {
          if (!this.contains(`.${classes[c]}`, selectorTextArr)) {
            selectorTextArr.push(`.${classes[c]}`);
          }
        }
      }

      // Extract CSS Rules
      let extractedCSSText = '';

      for (let i = 0; i < document.styleSheets.length; i += 1) {
        const s = document.styleSheets[i];
        /* eslint-disable */
        try {
          if (!s.cssRules) continue;
        } catch (e) {
          if (e.name !== 'SecurityError') throw e; // for Firefox
          continue;
        }
        /* eslint-enable */

        const cssRules = s.cssRules;
        for (let r = 0; r < cssRules.length; r += 1) {
          if (this.contains(cssRules[r].selectorText, selectorTextArr)) {
            extractedCSSText += cssRules[r].cssText;
          }
        }
      }

      return extractedCSSText;
    },
    appendCSS(cssText, element) {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('type', 'text/css');
      styleElement.innerHTML = cssText;

      const refNode = element.hasChildNodes() ? element.children[0] : null;

      element.insertBefore(styleElement, refNode);
    },
    contains(str, arr) {
      return arr.indexOf(str) === -1;
    },
  },
};

</script>

<style lang='scss' scoped>
</style>