<template>
	<view class="home">
		<asearch></asearch>
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="500">
				
				<swiper-item v-for="(ite , index ) in banner" :key="index">
					<image :src="ite.image_src" mode="widthFix"></image>
				</swiper-item>
				
			</swiper>
		</view>
		
		
	</view>
</template>

<script>
	import asearch from '../../components/search.vue';
	export default {
		components:{
			asearch
		},
		data() {
			return {
				banner:[]
			}
		},
		onLoad(){
			this.getbanner();
		},
		methods: {
			getbanner(){

				this.req({
					url:"/api/public/v1/home/swiperdata",
				}).then(res=>{
					console.log(res);
					this.banner = res.data.message
				})
			}
		}

	}
</script>

<style lang="scss">
	.home{
		.banner{
			.swiper{width: 750rpx;height:340rpx}
			image{width: 100%;}
		}
	}
</style>
