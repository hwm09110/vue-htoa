<template>
	<div class="holiday">
		<h4 class="process-title">节假日设置</h4>
		<Row class="process-addBtn" style="margin: 10px 0 5px;">
			<i-button type="info" @click="moda =! moda">新建</i-button>
		</Row>
		<div class="holiday-cont">
			<div class="holiday-table">
				<Table :columns="columns12" :data="data6">
					<template slot-scope="{ row, index }" slot="action">
						<!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button> -->
						<!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
						<span class="edit" @click="show(index)">编辑</span>
						<span class="delete" @click="remove(index)">删除</span>
					</template>
				</Table>
			</div>
			<div class="holiday-page">
				<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
			</div>
		</div>
		<!--新建-->
		<Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
			<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
			<Form ref="addForm" :model="addForm" :label-width="80" label-position="left">
				<!--<FormItem label="所属省份">
					<Select class="search-select" v-model="addForm.cityProvince">
						<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.name }}</Option>
					</Select>
				</FormItem>-->
				<FormItem label="节日名称">
					<Input v-model="addForm.holidayName"></Input>
				</FormItem>
				<FormItem label="开始日期">
					<!--<Input v-model="addForm.startTime"></Input>-->
					<Row>
						<Col span="12" style="width: 100%">
						<DatePicker type="date" placeholder="选择开始日期" style="width:100%"></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="结束日期">
					<!--<Input v-model="addForm.endTime"></Input>-->
					<Row>
						<Col span="12" style="width: 100%">
						<DatePicker type="date" placeholder="选择结束日期" style="width: 100%"></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="节假期奖金（元）">
					<Input v-model="addForm.bonus" placeholder="选填"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="info">确定</Button>
				<Button @click="moda=!moda">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: "节假日信息",
				moda: false,
				listCount: 0,
				listLen: 10,
				listCurpage: 1,
				columns12: [{
						title: "节假日编号",
						key: "order"
					},
					{
						title: "节假日名称",
						key: "classification"
					},
					{
						title: "节假日年份",
						key: "classification"
					},
					{
						title: "节假日开始日期",
						key: "classification"
					},
					{
						title: "节假日结束日期",
						key: "classification"
					},
					{
						title: "节假日礼金",
						key: "classification"
					},
					{
						title: "操作",
						slot: "action",
						width: 150,
						align: "center"
					}
				],
				data6: [{
						order: 18,
						classification: "品牌推广"
					},
					{
						order: 24,
						classification: "人事行政"
					},
					{
						order: 30,
						classification: "采购"
					}
				],
				addForm: {
					holidayName: "",
					startTime: "",
					endTime: "",
					bonus: ""
				}
			}
		},
		methods: {
			show(index) {
				this.$Modal.info({
					title: "User Info",
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				});
			},
			remove(index) {
				this.data6.splice(index, 1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.holiday {
		/deep/ .ivu {
			&-table {
				span.edit,
				span.delete {
					color: #30a5ff;
					cursor: pointer;
					margin: 0 6px;
					&:hover {
						text-decoration: underline;
					}
				}
			}
			&-modal {
				&-header {
					border-bottom: none;
				}
				&-body {
					padding: 0 16px;
				}
				&-footer {
					border-top: none;
					>div {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
		&-title {
			font-size: 16px;
		}
		&-addBtn {
			margin: 10px 0 15px;
		}
	}
</style>