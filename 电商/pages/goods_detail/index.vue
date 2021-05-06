<template>
	<view class="goodsinfo">
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="500" circular="true">
				<swiper-item v-for="(ite , index) in goodsinfo.pics" :key="index">
					<view class="swiper-item ">
						<image :src="ite.pics_mid" mode="widthFix"></image>
					</view>
				</swiper-item>

			</swiper>
		</view>
		<view  class="price">
			￥{{goodsinfo.goods_price}}
		</view>
		<view class="namebox">
			<view class="name">
				{{goodsinfo.goods_name}}
			</view>
			<view class="stars">
				<uni-icons type="star" size="20" color="#999"></uni-icons>
				<view>收藏</view>
			</view>
		</view>
		<view class="goods_content">
			<view class="title price">图文详情</view>
			<rich-text class="content" :nodes="goodsinfo.goods_introduce"></rich-text>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(e){
			console.log(e);
			this.getgoodsinfo(e)
		},
		data(){
			return{
				goodsinfo:[]
			}
		},
		methods:{
			getgoodsinfo(e){
				this.req({
					url:"/api/public/v1/goods/detail",
					data:e,
				}).then(res=>{
					console.log(res.data.message)
					this.goodsinfo = res.data.message
				})
			}
		}
	}
</script>

<style lang="scss">
	.goodsinfo{
		.swiper{
			width: 100%;
			height:600rpx;
			// border:1px solid;
			text-align: center;
			.swiper-item{
				image{
					width: 80%;
				}
			}
		}
		.price{
			padding:5px 10px;
			font-weight: bold;
			font-size: 40rpx;
			color:$bgcolor;
		}
		.namebox{
			display: flex;
			font-size: 28rpx;
			padding:5px;
			color:#666;
			border-top: 5px solid #dedede;
			border-bottom: 5px solid #dedede;
			.name{
				flex:8;
			}
			.stars{		
				border-left:1px solid #999;
				flex:2;
				text-align: center;
			}
		}
		.goods_content{
			.title{
				border-bottom: 1px solid #666;
			}
			.content{
				
			}
		}
	}
</style>
