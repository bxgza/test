<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
console.log("feature：图表数据")
// 图表DOM引用
const categoryChart = ref()
const statusChart = ref()
const trendChart = ref()

// 图表实例
let categoryChartInstance = null
let statusChartInstance = null  
let trendChartInstance = null

// 统计数据
const stats = ref({
  total: 0,
  published: 0,
  draft: 0,
  categories: 0
})

// 模拟数据（实际应该从API获取）
const initCharts = () => {
  // 统计卡片数据
  stats.value = {
    total: 156,
    published: 120,
    draft: 36,
    categories: 8
  }

  // 分类分布饼图
  categoryChartInstance = echarts.init(categoryChart.value)//创建图表实例
  categoryChartInstance.setOption({   //设置图表配置
    tooltip: {     //鼠标悬停
      trigger: 'item',    //数据项触发
      formatter: '{a} <br/>{b}: {c}篇 ({d}%)'
    },
    legend: {  //图例
      orient: 'vertical',  //垂直排列
      right: 10,    
      top: 'center'
    },
    series: [{      //数据系列
      name: '文章分类',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['40%', '50%'],
      data: [
        { value: 70, name: '技术文章' },
        { value: 39, name: '生活随笔' },
        { value: 28, name: '学习笔记' },
        { value: 19, name: '项目总结' }
      ],
      emphasis: {    //高亮样式
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  })

  // 状态分布环形图
  statusChartInstance = echarts.init(statusChart.value)
  statusChartInstance.setOption({
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}篇 ({d}%)'
    },
    legend: {
      orient: 'vertical', 
      right: 10,
      top: 'center'
    },
    series: [{
      name: '发布状态',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false
      },
      data: [
        { value: 120, name: '已发布', itemStyle: { color: '#67C23A' } },
        { value: 36, name: '草稿', itemStyle: { color: '#E6A23C' } }
      ]
    }]
  })

  // 发布趋势折线图
  trendChartInstance = echarts.init(trendChart.value)
  trendChartInstance.setOption({
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {       //类目轴
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
    },
    yAxis: {       //数值轴
      type: 'value'
    },
    series: [{
      name: '发布数量',
      type: 'line',    //折线图
      data: [12, 18, 15, 22, 19, 25, 30],
      smooth: true,
      lineStyle: {
        color: '#409EFF'
      },
      areaStyle: {       //填充区域
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
          { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
        ])
      }
    }]
  })
}

onMounted(() => {
  initCharts()
})

onUnmounted(() => {
  // 销毁图表实例
  categoryChartInstance?.dispose()    //如果实例存在才销毁
  statusChartInstance?.dispose() 
  trendChartInstance?.dispose()
})
</script>
<template>
  <div class="charts-container">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stats-cards">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-number">{{ stats.total }}</div>
            <div class="stat-label">总文章数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-number">{{ stats.published }}</div>
            <div class="stat-label">已发布</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-number">{{ stats.draft }}</div>
            <div class="stat-label">草稿</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-item">
            <div class="stat-number">{{ stats.categories }}</div>
            <div class="stat-label">分类数</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="charts-row">
      <el-col :span="12">
        <el-card header="文章分类分布">
          <div ref="categoryChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="发布状态分布">
          <div ref="statusChart" style="height: 300px;"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="charts-row">
      <el-col :span="24">
        <el-card header="近30天发布趋势">
          <div ref="trendChart" style="height: 350px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>



<style scoped>
.charts-container {
  padding: 20px;
}

.stats-cards {
  margin-bottom: 20px;
}

.stat-card {
  text-align: center;
}

.stat-item {
  padding: 20px 0;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #909399;
}

.charts-row {
  margin-bottom: 20px;
}
</style>