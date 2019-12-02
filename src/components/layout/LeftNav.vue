<template>
  <div class="nav-list-box">
    <Menu
        :active-name="leftNavActive"
        :open-names="leftNavOpen"
        :width="menu_width"
        style="height:100%;"
        :accordion="isAccordion"
        v-if="isRender"
      >
        <Submenu 
          :name="item.name" 
          v-for="(item, index) of leftNavList" 
          :key="index" 
          v-if="handleMenu2Filter(item)">
          <template slot="title">
            <Icon type="md-home" size="21"/>
            <span style="position:relative; top:3px;">{{item.text}}</span>
          </template>
          <MenuItem
            :name="subItem.name"
            v-for="(subItem, i) of item.subNav"
            :key="i"
            v-if="handleMenu3Filter(subItem) "
            :to="{name: subItem.name}"
          >
            <span style="margin-left:8px;">{{subItem.text}}</span>
          </MenuItem>
        </Submenu>
      </Menu>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: 'LeftNav',
  data (){
    return {
      iconSize: 20,
      theme: 'light',
      menu_width: 'auto',
      isAccordion: false, //是否开启手风琴模式，开启后每次至多展开一个子菜单
      isRender: true,
    }
  },
  computed: {
    ...mapState(['leftNavList', 'leftNavOpen', 'leftNavActive']),
  },
  watch: {
    leftNavOpen: function(newVal, oldVal) {
      this.isRender = false
      this.$nextTick(() => {
        this.isRender = true
      });
    },
  },
  methods: {
    handleMenu2Filter() {
      return true
    },

    handleMenu3Filter() {
      return true
    }
  },
  created (){
  },
  mounted (){
  }
}
</script>

<style lang="scss" scoped>
</style>


