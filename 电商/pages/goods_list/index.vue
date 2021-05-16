<template>
	<view>
		<search></search>
		<tabs :tabdata="tabs" @tabid="tabid">
			<block v-if="tabs[0].isAct">
				<view v-for="(ite , index) in goodslist" :key="index" >
					<navigator :url="'/pages/goods_detail/index?goods_id='+ite.goods_id" class="tabbox">
						<view class="img">
							<image v-if="ite.goods_small_logo" :src="ite.goods_small_logo" mode="widthFix"></image>
							<image v-if="!ite.goods_small_logo" src="@/static/noneimg.jpg" mode="widthFix"></image>
						</view>
						<view class="info">
							<view class="gname">{{ite.goods_name}}</view>
							<view class="pic">￥{{ite.goods_price}}</view>
						</view>
					</navigator>
				</view>
			</block>
			<block v-if="tabs[1].isAct">2</block>
			<block v-if="tabs[2].isAct">3</block>
		</tabs>
	</view>
</template>

<script>
	import tabs from '@/components/tabs.vue';
	import search from '@/components/search.vue';
	export default{
		components:{
			search,
			tabs,
		},
		data(){
			return{
				tabs:[
					{
						id:0,
						value:"综合",
						isAct:true,
					},
					{
						id:1,
						value:"销量",
						isAct:false,
					},
					{
						id:2,
						value:"价格",
						isAct:false,
					}
				],
				params:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
					
				},
				goodslist:[],
				total:'',
			}
		},
		onLoad(e){
			console.log(e);
			this.params.cid = e.cid;
			this.getlist();
		},
		onReachBottom(){
			console.log('触底',this.goodslist.length,this.total)
			if(this.goodslist.length < this.total){	
				this.params.pagenum++;
				this.getlist();
			}else{
				uni.showToast({
				    title: '没有更多了',
					icon:'none',
				});
			}
		},
		onPullDownRefresh(){
			this.params.pagenum = 1;
			this.goodslist=[];
			this.getlist();
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},1000)
		},
		methods:{
			getlist(){
				this.req({
					url:'/api/public/v1/goods/search',
					data:this.params,
				}).then(res=>{
					console.log(res);
					this.total = res.data.message.total;
					this.goodslist =[...this.goodslist,...res.data.message.goods];
				})
			},
			tabid(id){
				this.tabs.map(
					ite=>{
						ite.id === id?ite.isAct=true:ite.isAct=false
					}
				)
			}
		}
	}
</script>

<style lang="scss">
	.tabbox{
		display: flex;
		.img{
			flex:2;
			padding:5px;
			image{width: 100%;}
		}
		.info{
			flex:3;
			font-size: 26rpx;
			padding:50rpx 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.pic{
				color:red
			}
		}
	}
</style>
