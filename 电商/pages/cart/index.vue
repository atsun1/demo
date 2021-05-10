<template>
	<view class="crat">
		购物车
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cart:[]
			}
		},
		onLoad(e) {
			
			let cart = uni.getStorageSync("cart")
			this.cart = cart;
			console.log(cart);
		}
	}
</script>

<style>
</style>
