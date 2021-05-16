<template>
	<view>
		<button type="default" @getuserinfo="userinfo" open-type="getUserInfo">获取授权</button>
		<button type="default" @getphonenumber="usernumber" open-type="getPhoneNumber">获取手机号</button>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				params:{}
				
			}
		},
		methods:{
			userinfo(e){
				console.log(e)
				uni.login({
					timeout:10000,
					success: (res) => {
						console.log(res)
					}
				})
				
				uni.setStorageSync('token','BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
				setTimeout(()=>uni.navigateTo({
						url:'/pages/pay/index'
					}),2000)
				
			},
			usernumber(e){
				
	
			}
		}
	}
</script>

<style>
</style>
