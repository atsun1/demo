<template>
	<view class="collect">
		<uni-list v-for="(ite,index) in starlist" :key="index">
			<uni-list-item :title="ite.goods_name" :note="ite.goods_price" :thumb="ite.goods_small_logo"  ></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				starlist:[]
			}
		},
		onShow(){
			let starlist = uni.getStorageSync("starlist")||[];
			console.log(starlist)
			this.starlist = starlist
		}
	}
</script>

<style lang="scss">
	.collect{
		
	}
</style>
