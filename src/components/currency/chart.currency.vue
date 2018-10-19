<template>
  <div class="chart-currency">
    <el-row :gutter="20">
      <el-col :sm="6" :md="4">
        <el-form ref="CNYChartQueryForm" :model="query" label-width="80px" label-position="top" size="mini">
          <h3>筛选</h3>
          <el-form-item label="币值范围">
            <el-row>
              <el-col :span="11">
                <el-input v-model="query.price_start" type="number" min="0.0" step="0.1"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-input v-model="query.price_end" type="number" min="0.0" step="0.1"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="开始时间" prop="date_start">
            <el-date-picker type="date" placeholder="选择日期" v-model="query.date_start" class="block"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="date_end">
            <el-date-picker type="date" placeholder="选择日期" v-model="query.date_end" class="block"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="filter()" class="block">筛选</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :sm="18" :md="20">
        <div ref="CNYChart" style="height: 400px;"></div>
        <!--<v-chart :options="currencyCNYChartOpt" />-->
      </el-col>
      <!--<el-col :span="12"><v-chart :options="currencyJPYChartOpt" /></el-col>-->
    </el-row>
  </div>
</template>

<script>
import ECharts from 'echarts';
import * as CurrencyService from '../../service/currency.service';

export default {
  name: 'chartCurrency',
  data() {
    return {
      CNYChartsInstance: null,
      query: {
        price_start: 0,
        price_end: 0,
        date_start: '',
        date_end: ''
      },
      currencyCNYChartOpt: {
          title: {
            text: '美元对人民币汇率图',
            left: 'center',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
          },
          series: []
        },
      currencyJPYChartOpt: {}
    }
  },
  mounted: async function () {
    this.currencyCNYChartOpt = this.generateCNYChartOpt(...await this.getCurrency());
    this.CNYChartsInstance = ECharts.init(this.$refs.CNYChart);
    this.CNYChartsInstance.setOption(this.currencyCNYChartOpt);
  },
  methods: {
    filter: async function () {
      this.currencyCNYChartOpt = this.generateCNYChartOpt(...await this.getCurrency());
      this.CNYChartsInstance.setOption(this.currencyCNYChartOpt);
    },
    getCurrency() {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await CurrencyService.getCurrency(this.query);
          let {currency, currencyDate} = res.data;
          resolve([currencyDate, currency[2].data])
        } catch (e) {
          reject(e)
        }
      });
    },
    generateCNYChartOpt(x, y) {
      return Object.assign({}, this.currencyCNYChartOpt, {
        tooltip: {
          trigger: 'axis',
          formatter: '1 USD = {c} CNY<br/>{b}'
        },
        xAxis: {
          data: x
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 90,
            end: 100
          }
        ],
        series: [
          {
            name: '美元对人民币汇率',
            type: 'line',
            smooth: true,
            data: y,
            symbol: 'none',
            sampling: 'average'
          },
        ]
      });
    },
  },
};
</script>

<style scoped lang="sass">
  .chart-currency
    >.el-row
      margin-bottom: 20px
    .el-form
      h3
        margin-top: 0
      .line
        text-align: center
    .echarts
      margin: 0 auto
  .block
    width: 100%
</style>
