<template>
	<div class="meetingRoom">
		<h4 class="process-title">会议室设置</h4>
		<Row class="process-addBtn" style="margin: 10px 0 5px;">
			<i-button type="info" @click="newRoom">新增</i-button>
		</Row>
		<div class="meetingRoom-cont">
			<div class="meetingRoom-table">
				<Table stripe :columns="columns12" :data="data6">
					<template slot-scope="{ row, index }" slot="action">
						<!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button> -->
						<!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
						<span class="edit" @click="show(index)">编辑</span>
						<span class="delete" @click="remove(index)">删除</span>
					</template>
				</Table>
			</div>
			<div class="meetingRoom-page">
				<!--<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />-->
			</div>
		</div>
		<!--新增人员类别-->
		<Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
			<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
			<Form ref="addForm" :model="addForm" :label-width="100" label-position="left">
				<FormItem label="会议室名称">
					<Input v-model="addForm.meetingRoomName"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="info" @click="onsubmit	">确定</Button>
				<Button @click="moda=!moda">取消</Button>
			</div>
		</Modal>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: "会议室设置",
				moda: false,
				listCount: 0,
				listLen: 10,
				listCurpage: 1,
				columns12: [{
						title: "会议室编号",
						key: "room_id"
					},
					{
						title: "会议室名称",
						key: "room_name"
					},
					{
						title: "操作",
						slot: "action",
						width: 150,
						align: "center"
					}
				],
				data6: [],
				addForm: {
					meetingRoomName: "",
					room_guid:""

				}
			}
		},
		methods: {
			show(index) {//显示编辑
				let self = this;
				self.moda=true;
				self.addForm.meetingRoomName=self.data6[index].room_name;
				self.addForm.room_guid=self.data6[index].room_guid;
			},
			remove(index) {//删除
				let self=this;
				let params;
				params={
					room_guid:self.data6[index].room_guid
				} 	
				self.$http.delRoom(params).then(res=>{
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
			newRoom() { //显示新增
				let self = this;
				self.moda = true;
				self.addForm.meetingRoomName = "";
				self.addForm.room_guid = ""
			},
			//新增
			submitNew(){
				let self=this;
				let params;
				if(self.addForm.meetingRoomName==''){
					self.$Message.info('请填写会议室名称');
					 return false;
				}
				params={
					room_name:this.addForm.meetingRoomName,
				} 	
				this.$http.addRoom(params).then(res=>{
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
					room_name:self.addForm.meetingRoomName,
					room_guid:self.addForm.room_guid
				}
				self.$http.editRoom(params).then(res=>{
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
				if(self.addForm.room_guid==""){
					self.submitNew();
				}else{
					self.submitEdit();
				}
			},
			//获取表格数据
			async getmeetRoom() {
				try {
					//					this.listParams.page = this.listCurpage
					const res = await this.$http.boardRoom()
					if(res.code === '200') {
						this.data6 = res.extraData;
					} else {
						this.$Message.warning(res.message)
					}
				} catch(err) {
					console.log(err)
				}
			},
			init() {
				this.getmeetRoom();
			}
		},
		created() {
			this.init();
		},
	};
</script>

<style lang="scss" scoped>
	.meetingRoom {
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