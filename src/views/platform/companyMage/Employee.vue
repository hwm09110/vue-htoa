<template>
	<div class="peopleManage">
		<h4 class="process-title">人员类别管理</h4>
		<Row class="process-addBtn" style="margin: 10px 0 5px;">
			<i-button type="info" @click="moda =! moda">新增</i-button>
		</Row>
		<div class="peopleManage-cont">
			<div class="peopleManage-table">
				<Table stripe :columns="columns12" :data="data6">
					<template slot-scope="{ row, index }" slot="action">
						<!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button> -->
						<!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
						<span class="edit" @click="show(index)">编辑</span>
						<span class="delete" @click="remove(index)">删除</span>
					</template>
				</Table>
			</div>
			<div class="peopleManage-page">
				<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
			</div>
		</div>
		<!--新增人员类别-->
		<Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
			<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
			<Form ref="addForm" :model="addForm" :label-width="80" label-position="left">
				<FormItem label="类别序号">
					<Input v-model="addForm.peopleManageNum"></Input>
				</FormItem>
				<FormItem label="类别名称">
					<Input v-model="addForm.peopleManageName"></Input>
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
				title: "人员类别管理",
				moda: false,
				listCount: 0,
				listLen: 10,
				listCurpage: 1,
				columns12: [{
						title: "类别序号",
						key: "order"
					},
					{
						title: "类别名称",
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
				statusList: [{
						name: "全部",
						value: 0
					},
					{
						name: "进行中",
						value: 1
					},
					{
						name: "已完成",
						value: 2
					},
					{
						name: "已退回",
						value: 3
					},
					{
						name: "已撤销",
						value: 4
					}
				],
				addForm: {
					peopleManageNum: "",
					peopleManageName: "",

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
	};
</script>

<style lang="scss" scoped>
.peopleManage {
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