<template>
	<view class="crat">
		<view class="address">
			<button @click="getAddress()" v-if="!address.userName">获取地址</button>
			<view v-else>地址详情</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cart:[],
				address:{},
			}
		},
		onLoad() {
			let cart = uni.getStorageSync("cart")
			this.cart = cart;
			console.log(cart);
			console.log(this.address)
		},
		methods:{
			getAddress(){
				console.log('微信下有效')
				//#ifndef H5
				// 需条件编译的代码
				uni.chooseAddress({
					success:res=>{
						this.address = res;
						console.log(this.address)
					}
				})
				//#endif
			}
		},
		
	}
</script>

<style>
</style>
