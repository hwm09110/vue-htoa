<template>
  <section class="site-location">
    <span class="home-icon"></span>
    <ul class="site-path">
      <li>首页</li>
      <li v-for="(text, index) of sitePaths" :key="index">{{text}}</li>
    </ul>
    <div class="datetime">{{nowTime}}</div>
  </section>
</template>

<script>
import { getTodayAndWeek } from "@/utils/moment"
import { mapState } from 'vuex'
export default {
  name: "Sitepath",
  data() {
    return {
      nowTime: '',
      pathName: [],
    }
  },
  computed: {
    ...mapState(['sitePaths'])
  },
  methods: {
    // 获取当天日期
    getNowTime() {
      this.nowTime = getTodayAndWeek()
    },

  },
  mounted() {
    this.getNowTime()
  }
}
</script>

<style lang="scss" scoped>
.site-location{
	position: relative;
	padding: 15px; 
	background-color: #f1f4f7;
	color: #5f6468;
	font-size: 12px;
}
.site-location .home-icon{
	display: inline-block;
	width: 14px;
	height: 14px;
	background-size: 14px 14px;
	background-image: url('../../assets/img/home-icon.png');
}
.site-location .site-path{
	display: inline-block;
  vertical-align: top;
  margin-left: 8px;
}
.site-location .site-path li{
	display: inline-block;
	position: relative;
	padding:0 8px;
}
.site-location .site-path li:first-child{
	padding-left: 0;
}
.site-location .site-path li::after{
	position: absolute;
	right: -4px;
	top:0px;
	content: '>';
}
.site-location .site-path li:last-child::after{
	display: none;
}
.site-location .datetime{
	float: right;
	font-size: 14px;
	color: #5f6468;
}

</style>

