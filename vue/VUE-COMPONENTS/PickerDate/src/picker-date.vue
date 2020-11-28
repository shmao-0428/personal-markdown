<!--
 * @Author: shmao
 * @Date: 2020-11-28 14:49:33
 * @LastEditors: shmao
 * @LastEditTime: 2020-11-28 18:10:17
-->
<template>
  <div class="picker-date" v-click-outside>
    <input type="text" :value="formatDate" />
    <div class="picker-date__main" v-if="visible">
      <div class="picker-header">
        <span>&lt;</span>
        <span @click="prevMonth">&lt;&lt;</span>
        <span>{{ time.year }}年</span>
        <span>{{ time.month + 1 }}月</span>
        <span @click="nextMonth">&gt;&gt;</span>
        <span>&gt;</span>
      </div>
      <div class="picker-main">
        <div class="picker-main__week">
          <span v-for="item in week" :key="item">
            {{ item }}
          </span>
        </div>
        <div class="days">
          <div v-for="i in 6" :key="i">
            <span
              :class="[
                'cell',
                'day',
                {
                  'current-day': isCurrentDay(
                    managementDays[(i - 1) * 7 + (j - 1)]
                  ),
                },
                {
                  'selected-day': isSelectDay(
                    managementDays[(i - 1) * 7 + (j - 1)]
                  ),
                },
                {
                  'not-current-month': !isCurrentMonth(
                    managementDays[(i - 1) * 7 + (j - 1)]
                  ),
                },
              ]"
              v-for="j in 7"
              :key="`_` + j"
              @click="selectDay(managementDays[(i - 1) * 7 + (j - 1)])"
            >
              {{ managementDays[(i - 1) * 7 + (j - 1)].getDate() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from './utils';

import { clickOutside } from './click-outside';

const ONE_DAY = 24 * 3600 * 1000;
export default {
  name: 'picker-date',
  directives: {
    clickOutside: clickOutside,
  },
  props: {
    value: {
      type: Date,
      default: () => new Date(),
    },
  },
  data() {
    const { year, month } = utils.getYearMonthDay(this.value);
    return {
      visible: false,
      week: ['一', '二', '三', '四', '五', '六', '日'],
      time: {
        year,
        month,
      },
    };
  },
  computed: {
    formatDate() {
      const { year, month, day } = utils.getYearMonthDay(this.value);
      // 0-11 ~ 1-12
      return `${year}-${month + 1}-${day}`;
    },
    managementDays() {
      const { year, month } = utils.getYearMonthDay(
        new Date(this.time.year, this.time.month, 1)
      );
      // 周日是 0
      const monthFirstDate = utils.getDate(year, month, 1);
      const _day = monthFirstDate.getDay();

      let time;
      if (_day === 0) {
        time = monthFirstDate - 6 * ONE_DAY;
      } else {
        time = monthFirstDate - (_day - 1) * ONE_DAY;
      }

      let days = [];
      for (let i = 0; i < 42; i++) {
        days.push(new Date(time + i * ONE_DAY));
      }

      return days;
    },
  },
  methods: {
    focus() {
      this.visible = true;
    },
    blur() {
      this.visible = false;
    },
    isCurrentDay(date) {
      const { year, month, day } = utils.getYearMonthDay(new Date());
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    isSelectDay(date) {
      const { year, month, day } = utils.getYearMonthDay(this.value);
      const { year: y, month: m, day: d } = utils.getYearMonthDay(date);
      return year === y && month === m && day === d;
    },
    isCurrentMonth(date) {
      const { year, month } = utils.getYearMonthDay(
        utils.getDate(this.time.year, this.time.month, 1)
      );
      const { year: y, month: m } = utils.getYearMonthDay(date);
      return year === y && month === m;
    },
    selectDay(date) {
      const { year, month } = utils.getYearMonthDay(date);
      this.time.year = year;
      this.time.month = month;
      this.$emit('input', date);
      this.blur();
    },
    prevMonth() {
      const time = utils.getDate(this.time.year, this.time.month, 1);
      time.setMonth(time.getMonth() - 1);
      if (time.getMonth() === 0) {
        time.setFullYear(time.getFullYear() - 1);
      }
      let { year, month } = utils.getYearMonthDay(time);
      this.time = {
        year,
        month,
      };
    },
    nextMonth() {
      const time = utils.getDate(this.time.year, this.time.month, 1);

      time.setMonth(time.getMonth() + 1);

      let { year, month } = utils.getYearMonthDay(time);
      this.time = {
        year,
        month,
      };
    },
  },
};
</script>

<style lang="stylus">
.picker-date
  width 32 * 7px
  &__main
    box-shadow 2px 2px 2px #ccc, -2px -2px 2px #ccc;
    width 32 * 7px;
    position absolute;
    .picker-header
      user-select none;
      display flex;
      justify-content space-around;
      align-items center;
      height 30px;
      font-size 16px;
      cursor pointer;
.picker-main__week
    display flex;
    justify-content space-around;
    align-items center;
    height 32px;
.day
  width 32px;
  height 32px;
.cell
  display inline-flex
  justify-content space-around
  align-items center
  box-sizing border-box;
.cell:hover
  border 1px solid skyblue;
.current-day
  background skyblue;
  border-radius 4px;
  color #fff;
.selected-day
  border 1px solid skyblue;
.not-current-month
  color gray;
</style>
