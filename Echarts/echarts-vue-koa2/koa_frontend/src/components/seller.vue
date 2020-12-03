<template>
  <div class="com-container">
    <div class="com-chart" ref="seller" />
  </div>
</template>

<script>
export default {
  name: 'seller',
  data() {
    return {
      chartInstance: null,
      allData: [],
    };
  },
  components: {},
  watch: {},
  mounted() {
    this.initCharts();
    this.getData();
    window.addEventListener('resize', this.resizeEcharts);
    this.resizeEcharts();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeEcharts);
  },
  methods: {
    initCharts() {
      this.chartInstance = this.$echarts.init(this.$refs.seller, 'chalk');

      const initOptions = {
        title: {
          text: '| 商家销售统计',
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white',
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOptions);
    },
    async getData() {
      const { data } = await this.$http.get('seller');
      this.allData = data;

      this.updateOptions();
    },
    updateOptions() {
      const yAxisData = this.allData.map((item) => item.name);
      const seriesData = this.allData.map((item) => item.value);

      const dataOptions = {
        yAxis: {
          data: yAxisData,
        },
        series: [
          {
            data: seriesData,
          },
        ],
      };

      this.chartInstance.setOption(dataOptions);
    },

    resizeEcharts() {
      const titleFontSize = (this.$refs.seller.offsetWidth / 100) * 3.6;
      const data = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };

      this.chartInstance.setOption(data);

      this.chartInstance.resize();
    },
  },
};
</script>

<style scoped lang="less"></style>
