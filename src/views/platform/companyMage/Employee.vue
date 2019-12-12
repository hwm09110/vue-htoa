<template>
	<div class="peopleManage">
		<h4 class="process-title">人员类别管理</h4>
		<Row class="process-addBtn" style="margin: 10px 0 5px;">
			<i-button type="info" @click="newEmp">新增</i-button>
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
				<!--<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />-->
			</div>
		</div>
		<!--新增 修改人员类别-->
		<Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
			<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
			<Form ref="addForm" :model="addForm" :label-width="80" label-position="left">
				<FormItem label="类别序号">
					<Input placeholder="请输入类别序号" v-model="addForm.sort"></Input>
				</FormItem>
				<FormItem label="类别名称">
					<Input placeholder="请输入类别名称" v-model="addForm.type_name"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="info" @click="onsubmit">确定</Button>
				<Button @click="moda=!moda">取消</Button>
			</div>
		</Modal>
		<!--end-->
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
				edit:false,
				listCurpage: 1,
				columns12: [{
						title: "类别序号",
						key: "sort"
					},
					{
						title: "类别名称",
						key: "type_name"
					},
					{
						title: "操作",
						slot: "action",
						width: 150,
						align: "center"
					}
				],
				data6: [
				],
				addForm: {
					sort: "",
					type_name: "",
					type_guid:""
				}
			}
		},
		methods: {
			show(index) {//显示编辑
				let self = this;
				self.moda=true;
				self.addForm.sort=self.data6[index].sort;
				self.addForm.type_name=self.data6[index].type_name;
				self.addForm.type_guid=self.data6[index].type_guid;
			},
			remove(index) {//删除
				let self=this;
				let params;
				params={
					type_guid:self.data6[index].type_guid
				} 	
				self.$http.delusertype(params).then(res=>{
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
			newEmp(){//显示新增
				let self = this;
				self.moda=true;
				self.addForm.sort="";
				self.addForm.type_name="";
				self.addForm.type_guid==""
				
			},
			//获取表格数据
			async getusertype() {
				try {
//					this.listParams.page = this.listCurpage
					const res = await this.$http.getusertype(this.listParams)
					if(res.code === '200') {
						this.data6 = res.extraData;
					} else {
						this.$Message.warning(res.message)
					}
				} catch(error) {
					console.log(error)
				}
			},
			//新增
			submitNew(){
				let self=this;
				let params;
				if(self.addForm.sort==''){
					 self.$Message.info('请填写类别序号');
					 return false;
				}else if(self.addForm.type_name==''){
					self.$Message.info('请填写类别名称');
					 return false;
				}
				params={
					sort:this.addForm.sort,
					type_name:this.addForm.type_name,
				} 	
				this.$http.addusertype(params).then(res=>{
					if(res.code==200){
						self.$Message.success(res.message);
						self.moda=false;
						self.init();
					}else{
						self.$Message.success(res.message);
					}
				}).catch(ero=>{
					console.log(ero)
				})
			},
			//编辑
			submitEdit(){
				let self=this;
				let params;
				params={
					sort:self.addForm.sort,
					type_name:self.addForm.type_name,
					type_guid:self.addForm.type_guid
				}
				self.$http.editusertype(params).then(res=>{
					if(res.code==200){
						self.$Message.success(res.message);
						self.moda=false;
						self.init();
					}else{
						self.$Message.success(res.message);
					}
				}).catch(ero=>{
					console.log(ero)
				})
			},
			//提交
			onsubmit(){
				let self = this;
				if(self.addForm.type_guid==""){
					self.submitNew();
				}else{
					self.submitEdit();
				}
			},
			init(){
				this.getusertype();
			}
		},
		created(){
			this.init();
		},
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