<template>
	<div class="city-rank">
		<h4 class="process-title">城市级别体系</h4>
		<Row class="process-addBtn" style="margin: 10px 0 5px;">
			<i-button type="info" @click="moda =! moda">新建市级</i-button>
		</Row>
		<div class="city-rank-cont">
			<div class="cityRank-table">
				<Table :columns="columns12" :data="data6">
			<template slot-scope="{ row, index }" slot="action">
				<!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button> -->
				<!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
				<span class="edit" @click="show(index)">编辑</span>
				<span class="delete" @click="remove(index)">删除</span>
			</template>
		</Table>
			</div>
			<!--<div class="cityRank-page">
				<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
			</div>-->
		</div>
		<!--新增市级-->
		<Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
			<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
			<Form ref="addForm" :model="addForm" :label-width="80" label-position="left">
				<FormItem label="所属省份">
						<Select class="search-select" v-model="addForm.cityProvince">
							<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.name }}</Option>
						</Select>
					</FormItem>
				<FormItem label="市级">
					<Input v-model="addForm.cityLevel"></Input>
				</FormItem>
				<FormItem label="城市级别">
						<Select class="search-select" v-model="addForm.cityRank">
							<Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.name }}</Option>
						</Select>
					</FormItem>
				<FormItem label="市级序号">
					<Input v-model="addForm.cityNum"></Input>
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
				title: "城市级别体系",
				moda: false,
				listCount: 0,
				listLen: 10,
				listCurpage: 1,
				columns12: [{
						title: "市级序号",
						key: "order"
					},
					{
						title: "所属省份",
						key: "classification"
					},
					{
						title: "市级",
						key: "classification"
					},
					{
						title: "城市级别",
						key: "classification"
					},
					{
						title: "操作",
						slot: "action",
						width: 150,
						align: "center"
					}
				],
				data6: [],
				statusList: [],
				addForm: {
					cityProvince: "",
					cityLevel: "",
					cityRank:"",
					cityNum:""
					
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
			},
			//获取表格数据
			async getCitylist() {
				try {
					//					this.listParams.page = this.listCurpage
					const res = await this.$http.citylist()
					if(res.code === '200') {
						this.data6 = res.extraData;
					} else {
						this.$Message.warning(res.message)
					}
				} catch(err) {
					console.log(err)
				}
			},
			//获取省份数据
			async getprovlist() {
				try {
					//					this.listParams.page = this.listCurpage
					const res = await this.$http.getprov()
					if(res.code === '200') {
						console.log(res)
					} else {
						this.$Message.warning(res.message)
					}
				} catch(err) {
					console.log(err)
				}
			},
			init() {
				this.getCitylist();
				this.getprovlist();
			}
		},
		created() {
			this.init();
		},
	};
</script>

<style lang="scss" scoped>
	.city-rank {
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