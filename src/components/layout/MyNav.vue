<template>
  <div class="my-nav-wrap">
    <ul class="nav-list">
      <li 
        v-for="(item, index) of myNavList" 
        :key="index"
        @click="handleNavClick(item)"
        :class="{'active': myNavActive == item.name}">
        {{item.text}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "MyNav",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['myNavList', 'myNavActive'])
  },
  methods: {
    handleNavClick(item) {
      console.log(item)
      this.$router.push({name: item.name})
    }
  }
}
</script>

<style lang="scss" scoped>
.my-nav-wrap{
  width: 100%;
  background-color: #fff;
  .nav-list{
    li{
      padding: 14px 24px;
      padding-left: 54px;
      cursor: pointer;
      &.active{
        background-color: #f0faff;
        color: #2d8cf0;
        position: relative;
        &::after{
          content: '';
          display: block;
          width: 2px;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          background: #2d8cf0;
        }
      }
    }
  }
}
</style>
