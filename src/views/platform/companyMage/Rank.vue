<template>
	<div class="processMage_type">
		<div class="processMageCont">
			<div class="processMageTree">
				<Tree :data="treeData" @on-select-change="handleNodeSelect"></Tree>
			</div>
			<div class="processMageTable">
				<Tabs type="card">
					<TabPane label="职位">
						<Row class="process-addBtn" style="margin-bottom: 5px">
							<i-button type="info" @click="newPosition">新建职位</i-button>
						</Row>
						<div class="processMagePost-main">
							<div class="table-wrap">
								<Table border :columns="columns12" :data="data6">
									<template slot-scope="{ row }" slot="name">
										<strong>{{ row.name }}</strong>
									</template>
									<template slot-scope="{ row, index }" slot="action">
										<span class="edit" style="margin-right: 5px" @click="show(index)">操作</span>
										<span class="delete" @click="remove(index)">删除</span>
									</template>
								</Table>
							</div>
							<!--<div class="page-wrap">
								<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
							</div>-->
						</div>
					</TabPane>
					<TabPane label="职级">
						<Row class="process-addBtn" style="margin-bottom: 5px">
							<i-button type="info" @click="moda1 =! moda1">新建职级</i-button>
						</Row>
						<div class="processMageRank-main">
							<div class="table-wrap">
								<Table border :columns="columns12" :data="data6">
									<template slot-scope="{ row }" slot="name">
										<strong>{{ row.name }}</strong>
									</template>
									<template slot-scope="{ row, index }" slot="action">
										<span class="edit" style="margin-right: 5px" @click="show(index)">操作</span>
										<span class="delete" @click="remove(index)">删除</span>
									</template>
								</Table>
							</div>
							<!--<div class="page-wrap">
								<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
							</div>-->
						</div>
					</TabPane>
				</Tabs>
			</div>
			<!-- 新增职位弹出框 -->
			<Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
				<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
				<Form ref="addForm" :model="addForm" :label-width="80" label-position="left">
					<FormItem label="职位">
						<Input placeholder="请输入职位" v-model="addForm.name"></Input>
					</FormItem>
					<FormItem label="职位序号">
						<Input placeholder="请输入职位序号" v-model="addForm.sort"></Input>
					</FormItem>
					<FormItem label="所属部门">
						<Select class="search-select" v-model="addForm.dept_guid">
							<Option v-for="item in statusList" :value="item.dept_guid" :key="item.id">{{ item.dept_name }}</Option>
						</Select>
					</FormItem>
				</Form>
				<div slot="footer">
					<Button type="info" @click="submitNewposition">确定</Button>
					<Button @click="moda=!moda">取消</Button>
				</div>
			</Modal>
			<!-- 新增弹出框end -->
			<!-- 新增职级弹出框 -->
			<Modal title="Title" v-model="moda1" :mask-closable="false" :transfer="false">
				<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
				<Form ref="addForm" :model="addForm" :label-width="80" label-position="left">
					<FormItem label="所属职位">
						<Select class="search-select" v-model="addForm.branch">
							<Option v-for="item in statusList" :value="item.dept_guid" :key="item.id">{{ item.dept_name }}</Option>
						</Select>
					</FormItem>
					<FormItem label="职级">
						<Input placeholder="请输入职级" v-model="addForm.name"></Input>
					</FormItem>
					<FormItem label="职级序号">
						<Input placeholder="请输入职级序号" v-model="addForm.order"></Input>
					</FormItem>
				</Form>
				<div slot="footer">
					<Button type="info">确定</Button>
					<Button @click="moda=!moda">取消</Button>
				</div>
			</Modal>
			<!-- 新增弹出框end -->
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: "职位职级体系",
				moda1: false,
				moda: false,
				listCount: 0,
				listLen: 10,
				listCurpage: 1,
				treeData: [{
					title: '宏途',
					guid: "0",
					expand: true,
					children: []
				}],
				statusList: [
				],
				columns12: [{
						title: '序号',
						key: 'id'
					},
					{
						title: '职位',
						key: 'duty_name'
					},
					{
						title: '职级',
						key: 'dept_name'
					},
					{
						title: '操作',
						slot: 'action',
						width: 150,
						align: 'center'
					}
				],
				data6: [],
				addForm: {
					name: "",
					sort: "",
					dept_guid: ""
				},
				listParams: {
					dept_guid: "",
				}
			};
		},
		methods: {
			//分页
			handleListPage() {
				this.init()
			},
			//点击行
			handleRowClick(rowItem) {
				console.log(rowItem);
				this.$router.push({
					name: "my_txlDetail",
					query: {
						user_guid: rowItem.user_guid
					}
				});
			},
			//选中树节点
			handleNodeSelect(node) {
				console.log("node", node);
				const dept_guid = node[0] && node[0]["guid"];
				this.listParams.dept_guid = dept_guid;
				this.getduty();
			},
			//数据处理
			transformData(sourceData) {
				let newData = sourceData.map(item => {
					item.monitor_name = item.monitor_name ? item.monitor_name : "-"
					return item
				})
				return newData
			},
			// 处理tree数据
			handleTreeData(sourceData) {
				let newData = []
				if(sourceData.length == 0) {
					return newData
				}

				sourceData.forEach(item => {
					let child = item.child
					let newItem = {
						title: item.dept_name,
						guid: item.dept_guid
					}
					if(child.length > 0) {
						newItem.children = this.handleTreeData(child)
					}
					newData.push(newItem)
				})

				return newData
			},
			show(index) {
				this.$Modal.info({
					title: 'User Info',
					content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
				})
			},
			remove(index) {
//				this.data6.splice(index, 1);
				console.log(this.data6[index].duty_guid);
				let self=this;
				let params;
				params={
					duty_guid:self.data6[index].duty_guid
				} 	
				self.$http.delduty(params).then(res=>{
					if(res.code==200){
						self.$Message.success('删除成功');
						this.init();
					}else{
						self.$Message.warning(res.message);
					}
				}).catch(ero=>{
					console.log(ero)
				})
			},
			//获取表格数据
			async getduty() {
				try {
//					this.listParams.page = this.listCurpage
					const res = await this.$http.getduty(this.listParams)
					if(res.code === '200') {
						this.data6 = res.extraData;
					} else {
						this.$Message.warning(res.message)
					}
				} catch(error) {
					console.log(error)
				}
			},
			// 拉取部门tree数据
			async getTreeData() {
				try {
					const res = await this.$http.getDeptsLevel()
					if(res.code === '200') {
						let treeData = this.handleTreeData(res.extraData)
						this.treeData[0]["children"] = treeData;
						this.statusList=res.extraData;
					} else {
						this.$Message.warning(res.message)
					}
				} catch(error) {
					console.log(error)
				}
			},
			init() {
				this.getduty();
				this.getTreeData()
			},
			newPosition(){
				let self = this;
				self.moda = true;
			},
			submitNewposition(){
				let self=this;
				let params;
				if(self.addForm.name==''){
					 self.$Message.info('请填写职位');
					 return false;
				}else if(self.addForm.sort==''){
					self.$Message.info('请填写职位序号');
					 return false;
				}else if(self.addForm.dept_guid==''){
					self.$Message.info('请选择所属部门');
					 return false;
				}
				params={
					name:this.addForm.name,
					sort:this.addForm.sort,
					dept_guid:this.addForm.dept_guid
				} 	
				this.$http.addduty(params).then(res=>{
					if(res.code==200){
						self.$Message.success(res.message);
						self.init();
					}else{
						self.$Message.success(res.message);
					}
				}).catch(ero=>{
					console.log(ero)
				})
			},
		},
		created() {
			this.init()
		}
	};
</script>

<style lang="scss" scoped>
	.edit,
	.delete {
		color: #30a5ff;
		cursor: pointer;
		margin: 0 6px;
		&:hover {
			text-decoration: underline;
		}
	}
	
	.processMageCont {
		margin-top: 20px;
		display: -webkit-box;
		.processMageTree {
			width: 200px;
			max-height: 800px;
			overflow: auto;
		}
		.processMageTable {
			flex: 1;
		}
	}
</style>