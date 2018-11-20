<template>
  <div class="todo-item-box">
    <div class="add-item">
      <span class="icon"></span>
      <span class="text">添加事项</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToItem',
  data (){
    return {
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
  .todo-item-box{
    padding: 15px;
    background-color: #fff;
    .add-item{
      text-align: center;
      cursor: pointer;
      color: #30A5FF;
      background: #f1f1f1;
      padding: 12px 0;
      border-radius: 0 0 10px 10px;
      .icon{
        width: 14px;
        height: 14px;
        vertical-align: middle;
        margin-right: 5px;
        display: inline-block;
        background: url('../../assets/img/icons.png') no-repeat;
        background-position: -1px -127px;
      }
    }
  }
</style>


