<template>
  <div class="apply-container allRecord">
    <div class="page-title">
      <h2 class="title">公司加班记录</h2>
    </div>
    <i-form :model="formValidate" :label-width="80" ref="formValidate">
      <Form-item label="申请人" prop="name">
        <i-input :value.sync="formValidate.name" placeholder="输入申请人姓名关键字"></i-input>
      </Form-item>
      <Form-item label="部门" prop="department">
        <i-select :model.sync="formValidate.department" placeholder="请选择所在地">
          <i-option value>全部</i-option>
          <i-option value="shanghai">测试部门</i-option>
          <i-option value="shenzhen">iOS部门</i-option>
        </i-select>
      </Form-item>
      <Form-item label="时间范围">
        <Row>
          <i-col span="11">
            <Form-item prop="date">
              <Date-picker type="date" placeholder="开始时间" :value.sync="formValidate.startDate"></Date-picker>
            </Form-item>
          </i-col>
          <i-col span="2" style="text-align: center">-</i-col>
          <i-col span="11">
            <Form-item prop="time">
              <Date-picker type="date" placeholder="结束时间" :value.sync="formValidate.endDate"></Date-picker>
            </Form-item>
          </i-col>
        </Row>
      </Form-item>
      <Form-item>
        <i-button type="primary" icon="ios-search" @click="handleSubmit('formValidate')">查询</i-button>
      </Form-item>
    </i-form>
    <Table height="calc(100% - 220px)" :columns="table.columns" :data="table.all"></Table>
    <Page :total="100" show-total show-elevator />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formValidate: {
        name: "",
        department: "",
        startDate: "",
        endDate: ""
      },
      table: {
        columns: [
          {
            title: "申请人",
            key: "name"
          },
          {
            title: "部门",
            key: "department"
          },
          {
            title: "加班时间",
            key: "time"
          },
          {
            title: "加班内容",
            key: "content"
          },
          {
            title: "加班地点",
            key: "address"
          },
          {
            title: "加班时长",
            key: "overtimeHours"
          },
          {
            title: "加班费",
            key: "overtimePay"
          }
        ],
        // 所有
        all: [
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            content: "1111",
            address: "宏途教育",
            overtimeHours: "2小时",
            overtimePay: "--"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            content: "1111",
            address: "宏途教育",
            overtimeHours: "2小时",
            overtimePay: "--"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            content: "1111",
            address: "宏途教育",
            overtimeHours: "2小时",
            overtimePay: "--"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            content: "1111",
            address: "宏途教育",
            overtimeHours: "2小时",
            overtimePay: "--"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            content: "1111",
            address: "宏途教育",
            overtimeHours: "2小时",
            overtimePay: "--"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        // if (valid) {
        //   this.$Message.success("提交成功!");
        // } else {
        //   this.$Message.error("表单验证失败!");
        // }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.allRecord {
  /deep/ .ivu-form {
    display: flex;
    flex-wrap: wrap;
    &-item {
      &:not(:last-of-type) {
        margin-right: 30px;
      }
      &:last-of-type {
        width: 100%;
        .ivu-form-item-content {
          margin-left: 0 !important;
        }
        .ivu-btn {
          padding: 0 30px;
        }
      }
    }
  }
  /deep/ .ivu-page {
    display: flex;
    justify-content: flex-end;
    margin: 15px 0;
  }
}
.apply-container {
  .page-title {
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: solid 1px #ccc;
    .title {
      color: #666;
      font-size: 16px;
    }
  }
  // 申请人信息
  .applyer-info {
    background-color: #f9f9f9;
    padding: 0 15px 0 30px;
    margin-bottom: 15px;
    .info-item {
      display: inline-block;
      height: 45px;
      line-height: 45px;
      margin-right: 60px;
      font-size: 14px;
      .item-label {
        font-weight: 700;
      }
      .item-val {
      }
    }
  }
}
</style>
