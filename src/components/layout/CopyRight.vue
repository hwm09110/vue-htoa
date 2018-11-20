<template>
    <div class="copyRight">
        <p v-html="content"></p>
    </div>
</template>

<script>
export default {
    name: "CopyRight",
    data (){
        return {
          content: `Copyright©${new Date().getFullYear()} 广州宏途教育网络科技有限公司 All Rights Reserved 粤ICP备15058200号<br/>服务热线：020-38664641`
        }
    }
}
</script>

<style scoped>
   .copyRight{
      font-size: 13px;
      line-height: 22px;
      color: #666;
      width: 100%;
      padding: 20px 0;
      text-align: center;
    }
</style>

