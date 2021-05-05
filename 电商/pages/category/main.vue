<template>
	<view class="cate">
		<search></search>
		<view class="content">
			<scroll-view scroll-y="true" class="left">
				<view v-for="(ite , index) in cate" :key="index" :class="[ isact==ite.cat_id? 'act' : '' ]" @click="getcatechild(ite.cat_id,index)">
					{{ite.cat_name}}
				</view>
			</scroll-view>
			<scroll-view scroll-y="true"  class="right">
				<view v-for="(ite1 , index) in catelist" :key="index" class="title">
						<view style="width: 100%;margin:30rpx 0 20rpx 0;font-weight: bold;font-size: 32rpx;">/{{ite1.cat_name}}/</view>
						<view v-for="(ite2 , ind) in ite1.children" :key="ind" class="child">
							<navigator :url="'/pages/goods_list/index?cid='+ite2.cat_id">
								<image :src="ite2.cat_icon"  mode="widthFix"></image>
								<text>{{ite2.cat_name}}</text>
							</navigator>
						</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import search from '@/components/search.vue';
	export default{
		components:{
			search
		},
		data(){
			return{
				cate:[],
				catelist:[],
				isact:'',
			}
		},
		onLoad(){
			this.getcate();
		},
		methods:{
			getcate(){
				this.req({
					url:"/api/public/v1/categories",
				}).then(res=>{
					console.log(res);
					console.log(res.data.message[0].children);
					this.isact = 1;
					this.cate = res.data.message;
					this.catelist = res.data.message[0].children;
				})
			},
			getcatechild(catid,index){
				console.log(catid,index)
				this.isact = catid;
				this.catelist = [];
				this.catelist = this.cate[index].children;
			}
		}
	}
	
</script>

<style lang="scss">
	.cate{
		.content{
			display: flex;
			height: calc( 100vh - 150px);
			
			.left{
				text-align: center;
				flex: 2;
				color:#666;
				.act{
					color: red;
					border-left:2px solid red;
					font-weight: bold;
				}
				font-size: 28rpx;
				view{margin:20rpx 0;}
			}
			.right{
				flex:5;
				text-align: center;
				.title{
					display: flex;
					flex-wrap:wrap;
					.child{
						width: 30%;
						margin:6rpx;
						font-size: 24rpx;
						color: #666;
					}
				}
				image{width: 90%;}
			}
		}
	}
	
</style>
