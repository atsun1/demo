<template>
	<view class="crat">
		<view class="address">
			<button @click="getAddress()">获取地址</button>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cart:[]
			}
		},
		onLoad() {
			let cart = uni.getStorageSync("cart")
			this.cart = cart;
			console.log(cart);
		},
		methods:{
			getAddress(){
				console.log('微信下有效')
				//#ifndef H5
				// 需条件编译的代码
				uni.chooseAddress({
					success(res){
						console.log(res)
					}
				})
				//#endif
			}
		},
		
	}
</script>

<style>
</style>
