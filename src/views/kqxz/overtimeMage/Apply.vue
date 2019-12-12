<template>
  <div class="apply-container">
    <div class="page-title">
      <h2 class="title">加班申请</h2>
    </div>
    <div class="applyer-info">
      <div class="info-item">
        <span class="item-label">姓名：</span>
        <span class="item-val">{{userInfo.user_name}}</span>
      </div>
      <div class="info-item">
        <span class="item-label">部门：</span>
        <span class="item-val">{{userInfo.dept_name}}</span>
      </div>
      <div class="info-item">
        <span class="item-label">职务：</span>
        <span class="item-val">{{userInfo.duty}}</span>
      </div>
      <div class="info-item">
        <span class="item-label">单号：</span>
        <span class="item-val">{{orderNumber}}</span>
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
      <FormItem label="加班地点" prop="place">
        <Input v-model="formValidate.place" style="width: 50%"></Input>
      </FormItem>
      <FormItem label="加班时间" prop="stime">
        <!--  @on-change="formValidate.stime=$event" -->
        <DatePicker type="date" v-model="formValidate.stime"></DatePicker>
      </FormItem>
      <FormItem label="加班时长" prop="hours">
        <Select
          v-model="formValidate.hours"
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
      <FormItem label="是否计划调休" prop="is_tx">
        <Select v-model="formValidate.is_tx" style="width: 6%">
          <Option :value="2">是</Option>
          <Option :value="1">否</Option>
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
import { mapState } from "vuex";
import moment from "moment";
export default {
  computed: {
    ...mapState(["userInfo"])
  },
  data() {
    const validateHours = (rule, value, callback) => {
      let num = Number(value);
      if (isNaN(num)) {
        callback(new Error(`请选择/输入加班时长(数字)`));
      } else {
        callback();
      }
    };
    return {
      orderNumber: Math.round(Date.now() / 1000), // 单号
      p_info: {
        p_guid: "",
        p_name: "",
        step_guid: ""
      },
      formValidate: {
        content: "",
        place: "",
        stime: "",
        hours: 0, // 加班时长
        is_tx: 2 // 是否计划调休
      },
      overtimeHours: [
        {
          value: 0,
          label: "--"
        },
        {
          value: 0.5,
          label: 0.5
        },
        {
          value: 1,
          label: 1
        },
        {
          value: 1.5,
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
        },
        {
          value: 6,
          label: 6
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
        place: [
          {
            required: true,
            message: "请填写地点",
            trigger: "blur"
          }
        ],
        stime: [
          {
            required: true,
            type: "date",
            message: "请选择加班时间",
            trigger: "change"
          }
        ],
        hours: [
          {
            required: true,
            validator: validateHours,
            trigger: ["change", "blur"]
          }
        ],
        is_tx: [
          {
            required: true,
            message: "请选择是否需要调休",
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  methods: {
    init() {
      this.getApplyInfo();
    },
    // 拉取个人数据
    async getApplyInfo() {
      try {
        const res = await this.$http.getOrAddOvertimeApply();
        if (res.code === "200") {
          const { p_info } = res.extraData;
          Object.assign(this.p_info, p_info);
        } else {
          this.$Message.warning(res.message);
        }
      } catch (err) {
        throw err;
      }
    },
    // 拉取个人数据
    async addApplyForm(params) {
      try {
        const res = await this.$http.addOvertimeApplyForm(params);
        if (res.code === "200") {
          this.$Message.success(res.message);
          setTimeout(() => {
            this.$refs.formValidate.resetFields();
          }, 1000);
        } else {
          this.$Message.warning(res.message);
        }
      } catch (err) {
        throw err;
      }
    },
    handleCreateOvertimeHoursOption(num) {
      this.overtimeHours.push({
        value: num,
        label: num
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.p_info, this.formValidate, {
            flow_number: this.orderNumber,
            stime: moment(this.formValidate.stime).format("YYYY-MM-DD")
          });
          this.addApplyForm(params);
        } else {
          this.$Message.error("请完善信息");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  created() {
    this.init();
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
    }
  }
}
</style>
