<template>
  <div class="chart-currency">
    <el-row :gutter="20">
      <el-col :sm="6" :md="4">
        <el-form ref="CNYChartQueryForm" :model="query" :rules="rules" label-width="80px" label-position="top" size="mini">
          <h3>筛选</h3>
          <el-form-item label="汇率范围 (单位: CNY)" prop="price">
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
          <el-form-item label="开始时间" prop="date">
            <el-date-picker type="date" placeholder="选择日期" v-model="query.date_start" class="block"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="date">
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
    const priceValidator = ( rule, value, callback ) => {
      const start = this.query.price_start;
      const end = this.query.price_end;
      if((start !== 0 || end !== 0) && start > end) {
        callback(new Error('币值过滤范围开始应低于结束'));
      } else {
        callback();
      }
    };
    const dateValidator = ( rule, value, callback ) => {
      const start = this.query.date_start;
      const end = this.query.date_end;
      if(start !== '' && end !== '' && start > end) {
        callback(new Error('时间过滤范围有误'));
      } else {
        callback();
      }
    };
    return {
      CNYChartsInstance: null,
      query: {
        price_start: 0,
        price_end: 0,
        date_start: '',
        date_end: ''
      },
      rules: {
        price: [
          { validator: priceValidator, trigger: 'blur' }
        ],
        date: [
          { validator: dateValidator, trigger: 'blur' }
        ],
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
      console.log(this.$refs['CNYChartQueryForm'].validate())
      this.currencyCNYChartOpt = this.generateCNYChartOpt(...await this.getCurrency());
      this.CNYChartsInstance.setOption(this.currencyCNYChartOpt);
    },
    getCurrency() {
      return new Promise(async (resolve, reject) => {
        try {
          const { data: { currency } } = await CurrencyService.getCurrency(this.query);
          resolve([currency[2].date, currency[2].data])
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

/*js 防抖的实现*/
const debounce = (fn, wait) => {
  let timeout = null;
  return () => {
    if(timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, wait)
  }
}

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
