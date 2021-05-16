<template>
	<view class="goodsinfo">
		<view class="banner">
			<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" duration="500" circular="true">
				<swiper-item v-for="(ite , index) in goodsinfo.pics" :key="index" >
					<view class="swiper-item " >
						<image :src="ite.pics_mid" mode="widthFix" @click="openimg(index)"></image>
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
		<view class="bottom-btns">
			<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '@/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	export default{
		components:{
			uniGoodsNav
		},
		onLoad(e){
			console.log(e);
			this.getgoodsinfo(e)
		},
		data(){
			return{
				goodsinfo:[],
				options: [
							{
								icon: 'headphones',
								text: '客服'
							}, {
								icon: 'shop',
								text: '店铺',
								// info: 2,
								// infoBackgroundColor:'#007aff',
								// infoColor:"red"
							}, 
							{
								icon: 'cart',
								text: '购物车',
								// info: 2
							},
				],
				buttonGroup: [
							{
								text: '加入购物车',
								backgroundColor: '#ff0000',
								color: '#fff'
							},
							{
								text: '立即购买',
								backgroundColor: '#ffa200',
								color: '#fff'
							}
				]
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
			},
			openimg(index){
				let urls = [];
				this.goodsinfo.pics.map(v=>{
							urls.push(v.pics_mid)
						});
				console.log(urls)
				uni.previewImage({
					current:index,
					urls:urls,
					loop:true,
				})
			},
			onClick (e) {
				if(e.index == 0){
					console.log('客服')
				};
				if(e.index == 1){
					console.log('店铺')
				};
				if(e.index == 2){
					// console.log('购物车')
					uni.switchTab({
					    url: '/pages/cart/index'
					});
					
				};
				
			        uni.showToast({
			          title: `点击${e.content.text}`,
			          icon: 'none'
			        })
			},
			buttonClick (e) {
				console.log(e);
				if(e.index == 0){
					// console.log('购物车')
					let cart = uni.getStorageSync("cart")||[];
					// let cart = uni.getStorageSync("cart")? uni.getStorageSync("cart") : [];
					let index = cart.findIndex(v=>v.goods_id == this.goodsinfo.goods_id);
					if(index === -1){
						console.log('不存在，第一次添加',cart,index)
						// 增加选中状态数据
						this.goodsinfo.checked =true;
						// 增加数量缓存
						this.goodsinfo.num = 1;
						cart.push(this.goodsinfo)
					}else{
						console.log('已存在 数组++',index)
						cart[index].num++;
					}
					uni.setStorageSync("cart",cart);
					uni.showToast({
						title:'加入成功',
						icon:'success',
						// mask:true
					})
				};
				if(e.index == 1){
					let cart = uni.getStorageSync("cart")
					console.log(cart)
				};
				// this.options[2].info++
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
				padding:0px 10rpx;
			}
			.stars{		
				border-left:1px solid #999;
				flex:2;
				text-align: center;
			}
		}
		.goods_content{margin-bottom: 50px;}
		.bottom-btns{
			position:fixed;
			bottom:0px;
			width: 100%;
		}
	}
</style>
