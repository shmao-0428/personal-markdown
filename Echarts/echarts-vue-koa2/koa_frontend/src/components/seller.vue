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
  },
  methods: {
    initCharts() {
      this.chartInstance = this.$echarts.init(this.$refs.seller);

      const initOptions = {
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
        },
        series: [
          {
            type: 'bar',
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
  },
};
</script>

<style scoped lang="less"></style>
