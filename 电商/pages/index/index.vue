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
		<view class="homenav">
			<uni-grid :column="4" :showBorder="false">
			    <uni-grid-item v-for="(ite , index) in homenav" :key="index">
			        <navigator :url="ite.navigator_url" :open-type="ite.open_type">
						<image :src="ite.image_src" mode="widthFix"></image>
					</navigator>
			    </uni-grid-item>
			</uni-grid>
		</view>
		<view class="floor">
			
			<view class="flist" v-for="(ite1 , index) in floordata" :key="index">
				<view class="ftitle">
					<image :src="ite1.floor_title.image_src" mode="widthFix"></image>
				</view>
				<view class="fson" v-for="(ite2 , index) in ite1.product_list" :key="index">
					<image :src="ite2.image_src" mode="widthFix"></image>
				</view>
			</view>
			
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
				banner:[],
				homenav:[],
				floordata:[],
			}
		},
		onLoad(){
			this.getbanner();
			this.getnav();
			this.getfloordata();
		},
		methods: {
			getbanner(){
				this.req({
					url:"/api/public/v1/home/swiperdata",
				}).then(res=>{
					console.log(res);
					this.banner = res.data.message
				})
			},
			getnav(){
				this.req({
					url:"/api/public/v1/home/catitems"
				}).then(res=>{
					console.log(res.data.message);
					this.homenav = res.data.message;
				})
			},
			getfloordata(){
				this.req({
					url:"/api/public/v1/home/floordata"
				}).then(res=>{
					console.log(res.data.message)
					this.floordata = res.data.message
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
		.homenav{
			margin-top: 20rpx;
			border:none;
			text-align: center;
			align-items: center;
			image{width: 90%;}
		}
		.floor{
			margin-top: 20rpx;
			.ftitle{
				width: 750rpx;
				height:59rpx;
				image{width:100%}
			}
			.fson{
				width: 33%;
				display: grid;
				image{
					width: 100%;
					// border:2rpx solid #fff;
					
					}
				
			}
		}
	}
</style>
