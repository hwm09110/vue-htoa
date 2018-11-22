<template>
  <div class="top-search-box">
      <Input search enter-button="搜索" placeholder="输入关键字">
        <Select v-model="type" slot="prepend" style="width:80px;">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Input>
  </div>
</template>

<script>
export default {
  name: 'TopSeach',
  data (){
    return {
      typeList:[
        {'label':'人员','value':1},
        {'label':'流程','value':2}
      ],
      type:'-1'
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


