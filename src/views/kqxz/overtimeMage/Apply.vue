<template>
  <div class="apply-container">
    <div class="page-title">
      <h2 class="title">加班申请</h2>
    </div>
    <div class="applyer-info">
      <div class="info-item">
        <span class="item-label">姓名：</span>
        <span class="item-val">黄伟明</span>
      </div>
      <div class="info-item">
        <span class="item-label">部门：</span>
        <span class="item-val">测试部门</span>
      </div>
      <div class="info-item">
        <span class="item-label">职务：</span>
        <span class="item-val">测试经理</span>
      </div>
      <div class="info-item">
        <span class="item-label">单号：</span>
        <span class="item-val">1575384952</span>
      </div>
    </div>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="加班内容" prop="content">
        <Input
          style="width: 96%"
          v-model="formValidate.content"
          type="textarea"
          placeholder
          :autosize="{minRows: 5,maxRows: 7}"
        ></Input>
      </FormItem>
      <FormItem label="加班地点" prop="address">
        <Input v-model="formValidate.address" style="width: 50%"></Input>
      </FormItem>
      <FormItem label="加班时间" prop="time">
        <DatePicker type="date" v-model="formValidate.time"></DatePicker>
      </FormItem>
      <FormItem label="加班时长" prop="overtimeHours">
        <Select
          v-model="formValidate.overtimeHours"
          allow-create
          filterable
          @on-create="handleCreateOvertimeHoursOption"
          style="width: 6%"
        >
          <Option
            v-for="(item, index) of overtimeHours"
            :key="index"
            :value="item.value"
          >{{item.label}}</Option>
        </Select>
        <span style="margin-left: 6px">小时</span>
      </FormItem>
      <FormItem label="是否计划调休" prop="isPlannedAdjustment">
        <Select v-model="formValidate.isPlannedAdjustment" style="width: 6%">
          <Option :value="1">是</Option>
          <Option :value="0">否</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          style="width: 140px; position: absolute; left: 20%;"
          @click="handleSubmit('formValidate')"
        >提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formValidate: {
        content: "",
        address: "",
        time: "",
        overtimeHours: 0, // 加班时长
        isPlannedAdjustment: 1 // 是否计划调休
      },
      overtimeHours: [
        {
          value: 0,
          label: "--"
        },
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 1.5
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 2.5,
          label: 2.5
        },
        {
          value: 3,
          label: 3
        },
        {
          value: 3.5,
          label: 3.5
        },
        {
          value: 4,
          label: 4
        },
        {
          value: 4.5,
          label: 4.5
        },
        {
          value: 5,
          label: 5
        },
        {
          value: 5.5,
          label: 5.5
        }
      ],
      ruleValidate: {
        content: [
          {
            required: true,
            message: "请填写加班内容",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请填写地点",
            trigger: "blur"
          }
        ],
        time: [
          {
            required: true,
            type: "date",
            message: "请选择加班时间",
            trigger: "change"
          }
        ],
        overtimeHours: [
          {
            required: true,
            type: "number",
            message: "请选择/输入加班时长(数字)",
            trigger: ["change", "blur"]
          }
        ],
        isPlannedAdjustment: [
          {
            required: true,
            message: "请选择是否需要调休",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    handleCreateOvertimeHoursOption(val) {
      this.overtimeHours.push({
        value: num,
        label: num
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>


<style lang="scss" scoped>
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
