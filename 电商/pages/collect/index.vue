<template>
	<view class="collect">

		<uni-list v-for="(ite,index) in starlist" :key="index" class="list"  >
		    <!-- 水平排列，左图右文 -->
		    <uni-list-item :title="ite.goods_name" :note="ite.goods_price" link :to="'../goods_detail/index?goods_id='+ite.goods_id" >
		        <template v-slot:header>
		            <view class="uni-thumb"><image :src="ite.goods_small_logo" mode="widthFix"></image></view>
		        </template>
		    </uni-list-item>
		</uni-list>
		
	</view>

</template>

<script>
	export default{
		data(){
			return{
				starlist:[],
				
			}
		},
		onShow(){
			let starlist = uni.getStorageSync("starlist")||[];
			starlist.map(v=>v.goods_price = v.goods_price.toString())
			console.log(starlist)
			this.starlist = starlist
		},
		methods:{
			togoods(){
				console.log('eeeeeeeeeeeeee')
			}
		}
	}
</script>

<style lang="scss">
	.collect{
		.list{
			image{
				width: 140rpx;
				height:140rpx;
				margin-right:20rpx;
			}
		}
	}
</style>
