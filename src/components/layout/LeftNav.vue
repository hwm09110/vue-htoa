<template>
  <div class="nav-list-box">
    <Menu :theme="theme" :open-names="['1']" :accordion="isAccordion" :width="menu_width">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-cart" :size="iconSize"/>
                采购管理
            </template>
            <MenuItem name="1-1">采购申请</MenuItem>
            <MenuItem name="1-2">采购申请列表</MenuItem>
            <MenuItem name="1-3">供应商管理</MenuItem>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-basket" :size="iconSize"/>
                仓库管理
            </template>
            <MenuItem name="2-1">仓库列表</MenuItem>
            <MenuItem name="2-2">库存商品管理</MenuItem>
            <MenuItem name="2-3">库存商品进销存管理</MenuItem>
        </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  name: 'LeftNav',
  data (){
    return {
      theme: 'light',
      menu_width:'auto',
      isAccordion:true, //是否开启手风琴模式，开启后每次至多展开一个子菜单
      iconSize:20
    }
  },
  methods: {
  },
  created (){
  },
  mounted (){
  }
}
</script>

<style lang="scss" scoped>
</style>


