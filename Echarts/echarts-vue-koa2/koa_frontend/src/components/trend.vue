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
      currentPage: 1,
      pageSize: 5,
      totalPage: null,
      timer: null,
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
    clearInterval(this.timer);
    window.removeEventListener('resize', this.resizeEcharts);
  },
  methods: {
    initCharts() {
      this.chartInstance = this.$echarts.init(this.$refs.seller, 'chalk');

      const initOptions = {
        title: {
          text: '| 商家销售统计',
          left: 20,
          right: 20,
          top: 20,
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '6%',
          bottom: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
        },
        yAxis: {
          type: 'category',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            z: 0,
            lineStyle: {
              color: '#2D3443',
            },
          },
        },
        series: [
          {
            type: 'line',
            label: {
              show: true,
              position: 'right',
              textStyle: {
                color: 'white',
              },
            },
            itemStyle: {
              // 指明颜色渐变的方向
              // 指明不同百分比之下颜色的值
              /**
               * 前四个参数表示 右下左上 从哪个位置开始变色
               */
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                // 百分之0状态之下的颜色值
                {
                  offset: 0,
                  color: '#5052EE',
                },
                // 百分之100状态之下的颜色值
                {
                  offset: 1,
                  color: '#AB6EE5',
                },
              ]),
            },
          },
        ],
      };
      this.chartInstance.setOption(initOptions);
    },
    async getData() {
      const { data } = await this.$http.get('trend');
      this.allData = data;
      console.log(data);

      this.updateOptions();
    },
    updateOptions() {
      const data = this.allData.slice((this.currentPage - 1) * 5, this.currentPage * 5);
      const yAxisData = data.map((item) => item.name);
      const seriesData = data.map((item) => item.value);

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
