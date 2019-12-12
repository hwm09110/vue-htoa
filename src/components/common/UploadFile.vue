<template>
  <div class="uploadfile-wrap">
    <div class="label">上传文件</div>
    <div class="content">
      <div class="upload-box">
        <Input readonly class="upload-input" />
        <Button type="primary" @click="hanldeUploadFile">上传文件</Button>
        <input ref="fileInput" type="file" :multiple="multiple" :style="{display:'none'}" @change="handleChooseFile">
      </div>
      <ul class="uploaded-file">
        <li v-for="(fileItem, index) of choosedFileList" :key="index">
          <span class="file-name">{{fileItem.fileName}}</span>
          <Icon type="ios-close" size="30" class="del-btn" @click="handleDelFile(index)" />
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "UploadFile",
  props: {
    'multiple': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileInput: null,
      // 已经选择的文件
      choosedFileList: [
        // {
        //   fileName: "2019年12月12日出差北京报告.pdf",
        //   file: null,
        // }
      ],
    }
  },
  methods: {
    // 上传文件
    hanldeUploadFile() {
      console.log(this.$refs["fileInput"])
      this.fileInput.click()
    },

    //选择文件
    handleChooseFile(ev) {
      const files = ev.target.files
      let newAdd = []
      Array.from(files).forEach(file => {
        const newItem = {
          fileName: file.name,
          file: file
        }
        // 过滤已经上传过的
        if(!this.choosedFileList.some(item => item.fileName == file.name)) {
          newAdd.push(newItem)
        }
      })
      this.fileInput.value = ""
      this.choosedFileList.push(...newAdd)
      const ret = {
        addList: newAdd,
        fileList: this.choosedFileList
      }
      this.$emit("on-choose", ret)
    },

    //删除文件
    handleDelFile(index) {
      const delItem = this.choosedFileList.splice(index, 1)
      const ret = {
        delFile: delItem,
        fileList: this.choosedFileList
      }
      this.$emit('on-delFile', ret)
    },

    //获取当前选中的文件
    getChooseFiles() {
      return this.choosedFileList
    }

  },
  mounted() {
    this.fileInput = this.$refs["fileInput"]
  }
}
</script>


<style lang="scss" scoped>
//文件上传
.uploadfile-wrap{
  display: flex;
  width: 700px;
  .label{
    width: 66px;
    margin-top: 10px;
  }
  .content{
    flex: 1;
    position: relative;
    .upload-input{
      width: 400px;
    }
    .uploaded-file{
      width: 400px;
      border-left: 1px solid #dcdcdc;
      border-right: 1px solid #dcdcdc;
      background-color: #fff;
      li{
        border-bottom: 1px solid #dcdcdc;
        padding: 2px 5px;
        display: flex;
        align-items: center;
        .file-name{
          max-width:94%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .del-btn{
          cursor: pointer;
          color: #30A5FF;
        }
        &:hover{
          background-color: #ebf7ff;
        }
      }
    }
  }
}
.uploadfile-wrap /deep/ .ivu-btn{
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.uploadfile-wrap /deep/ .ivu-input{
  border-radius: 0;
}
</style>
