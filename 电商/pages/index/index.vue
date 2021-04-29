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
			
			<view class="flist">
				<view class="ftitle">
					<image></image>
				</view>
				<view>
					
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
			border:none;
			text-align: center;
			align-items: center;
			image{width: 90%;}
		}
	}
</style>
