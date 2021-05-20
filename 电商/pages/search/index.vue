<template>
	<view class="search">
		<view class="top">	

			<uni-search-bar :radius="100" @confirm="search" value="" cancelButton="none" @input="searchinfo">
				<uni-icons slot="searchIcon" color="#999" size="18" type="search" />
			</uni-search-bar>
		</view>
		<view class="searchbox">
			<view v-for="(ite,index) in searchlist" :key="index">
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
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				searchlist:[],
				params:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				total:0,
			}
		},
		onReachBottom(e){
			console.log('数组长度'+this.searchlist.length,'总长度'+this.total)
			
			if(this.searchlist.length < this.total){
				this.params.pagenum++;
				this.getlist()
			}else{
				uni.showToast({
					title:'没有更多了'
				})
			}
		},
		methods:{
			// 检测value值改动进行搜索
			// #ifdef H5
			searchinfo(e){
				console.log(e)
				this.searchlist = []
				if(!e){
					return
				}
				this.params.query = e
				this.getlist()
			},
			// #endif
			// 点击搜索 进行搜索
			search(e){
				this.searchlist = []
				if(!e){
					return
				}
				this.params.query = e.value;
				this.getlist()
			},
			getlist(){
				this.req({
					url:'/api/public/v1/goods/search',
					data:this.params,
				}).then(res=>{
					console.log(res.data.message)
					this.total = res.data.message.total
					this.searchlist = [...this.searchlist,...res.data.message.goods]
				})
			},
		}
	}
</script>

<style lang="scss">
	.search{
		.top{
			
		}
		.searchbox{
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
		}
	}
</style>
