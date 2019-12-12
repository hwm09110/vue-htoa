<template>
	<div class="holiday">
		<h4 class="process-title">节假日设置</h4>
		<Row class="process-addBtn" style="margin: 10px 0 5px;">
			<i-button type="info" @click="newHoliday">新建</i-button>
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
			<!--<div class="holiday-page">
				<Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
			</div>-->
		</div>
		<!--新建-->
		<Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
			<div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
			<Form ref="addForm" :model="addForm" :label-width="120" label-position="left">
				</FormItem>
				<FormItem label="节日名称">
					<Input v-model="addForm.holidayName"></Input>
				</FormItem>
				<FormItem label="开始日期">
					<Row>
						<Col span="12" style="width: 100%">
						<DatePicker type="date" v-model="addForm.startTime" placeholder="选择开始日期" style="width:100%"></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="结束日期">
					<Row>
						<Col span="12" style="width: 100%">
						<DatePicker type="date" v-model="addForm.endTime" placeholder="选择结束日期" style="width: 100%"></DatePicker>
						</Col>
					</Row>
				</FormItem>
				<FormItem label="节假期奖金（元）">
					<Input v-model="addForm.bonus" placeholder="选填"></Input>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button type="info" @click="onsubmit">确定</Button>
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
						key: "holiday_id"
					},
					{
						title: "节假日名称",
						key: "holiday_name"
					},
					{
						title: "节假日年份",
						key: "year"
					},
					{
						title: "节假日开始日期",
						key: "start"
					},
					{
						title: "节假日结束日期",
						key: "end"
					},
					{
						title: "节假日礼金",
						key: ""
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
					holidayName: "",
					startTime: "",
					endTime: "",
					bonus: ""
				}
			}
		},
		methods: {
			show(index) {//显示编辑
				let self = this;
				self.moda=true;
				self.addForm.meetingRoomName=self.data6[index].room_name;
				self.addForm.room_guid=self.data6[index].room_guid;
				self.addForm.holidayName =self.data6[index].holiday_name;
				self.addForm.startTime =self.data6[index].start;
				self.addForm.endTime =self.data6[index].end;
				self.addForm.holiday_guid =self.data6[index].holiday_guid;
				self.addForm.bonus = self.data6[index].bonus;
			},
			remove(index) {//删除
				let self=this;
				let params;
				params={
					holiday_guid:self.data6[index].holiday_guid
				} 	
				self.$http.delHoliday(params).then(res=>{
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
			newHoliday(){//显示新增
				let self = this;
				self.moda = true;
				self.addForm.holidayName = "";
				self.addForm.startTime = "";
				self.addForm.endTime = "";
				self.addForm.holiday_guid = "";
				self.addForm.bonus = "";
			},
			//新增
			submitNew(){
				let self=this;
				let params;
				if(self.addForm.holidayName==''){
					self.$Message.info('请填写节日名称');
					 return false;
				}else if(self.addForm.startTime==''){
					self.$Message.info('请选择开始日期');
					 return false;
				}else if(self.addForm.endTime==''){
					self.$Message.info('请选择结束日期');
					 return false;
				}
				params={
					holiday_name:this.addForm.holidayName,
					start:this.addForm.startTime,
					end:this.addForm.endTime,
				} 	
				this.$http.addHoliday(params).then(res=>{
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
					holiday_name:this.addForm.holidayName,
					start:this.addForm.startTime,
					end:this.addForm.endTime,
					holiday_guid:self.addForm.holiday_guid
				}
				self.$http.editHoliday(params).then(res=>{
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
				if(self.addForm.holiday_guid==""){
					self.submitNew();
				}else{
					self.submitEdit();
				}
			},
		//获取表格数据
			async getholidayList() {
				try {
					//					this.listParams.page = this.listCurpage
					const res = await this.$http.holidayList()
					if(res.code === '200') {
						this.data6 = res.extraData;
					} else {
						this.$Message.warning(res.message)
					}
				} catch(error) {
					console.log(error)
				}
			},
			init() {
				this.getholidayList();
			}
		},
		created() {
			this.init();
		},
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