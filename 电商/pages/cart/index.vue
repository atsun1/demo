<template>
	<view class="cart">
		<view class="address">
			<button size="mini" @click="getAddress()" v-if="!address.userName">获取地址</button>
			<view v-else>
				<view>{{address.provinceName}} {{address.cityName}} {{address.countyName}} {{address.detailInfo}} </view>
				<view>{{address.userName}} {{address.telNumber}}</view>
			</view>
		</view>
		<view class="cart_list">
			<!-- <view class="title">
				购物车
			</view> -->
			<view class="list" v-for="(ite,index) in cart" :key="index">
				<view class="check">
					<label>
						<checkbox  :checked="ite.checked"  />{{ite.checked}}
					</label>
				</view>
				<view class="img">
					<image :src="ite.goods_small_logo" mode="widthFix"></image>
				</view>
				<view class="info">
					<view class="name">{{ite.goods_name}}</view>
					<view class="pAndb">
						<view class="price">￥{{ite.goods_price}}</view>
						<view class="btns">
							<text class="btn" >-</text>
							<text>{{ite.num}}</text>
							<text class="btn" >+</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="check">
				<label>
					<checkbox :checked="allcheck" /><text>全选</text>
				</label>
			</view>
			<view class="total">
				<view>合计：￥{{total}}</view>
			</view>
			<view class="sub">结算</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cart:[],
				address:{},
				allcheck:false,
				total:0,
			}
		},
		onShow(){
			let cart = uni.getStorageSync("cart")||[]
			let  allcheck = cart.length?cart.every(v=>v.checked):false
			this.allcheck = allcheck;
			 cart.forEach(v=>{
					if(v.checked){
						this.total += v.num * v.goods_price
						console.log(this.total,v.goods_price * v.num)
					}
				})
			
			
			this.cart = cart;
			console.log(cart,allcheck,this.total);
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

<style lang="scss">
	.cart{
		padding-bottom:100rpx;
		.address{
			height:100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			
		}
		.cart_list{
			border-top: 1px solid $bgcolor;
			// .title{
			// 	margin:30rpx 40rpx;
			// 	font-size: 34rpx;
			// }
			.list{
				display: flex;
				justify-content: center;
				align-items: center;
				.check{
					flex:1;
					padding:0 20rpx;
				}
				.img{
					flex:3;
					image{width: 100%;}
				}
				.info{
					flex:6;
					padding:0px 15rpx;
					.name{
						display: -webkit-box;
						font-size: 28rpx;
						margin-bottom:40rpx;;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.pAndb{
						display: flex;
						justify-content: space-between;
						font-size: 24rpx;
						.price{
							font-weight: bold;
							color:$bgcolor;
							font-size:32rpx;
						}
						.btns{
							text-align: center;
							.btn{
								display: inline-block;
								border:1px solid #999;
								height:40rpx;
								width:40rpx;
								margin:0px 10rpx;
							}
						}
					}
				}
				
				
				
			}
		}
		.footer{
			position:fixed;
			bottom:0;
			left:0;
			width: 100%;
			padding-bottom: var(--window-bottom);
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			height:100rpx;
			border-top: 1px solid #999;
			.check{
				flex:2;
				font-size: 28rpx;
				padding:0 20rpx;
			}
			.total{
				flex:5;
				text-align:right;
				padding:0 20rpx;
			}
			.sub{
				display: flex;
				flex:3;
				background-color: $bgcolor;
				height:100%;
				align-items: center;
				justify-content: center;
				color:#fff;
			}
		}
	}
	
</style>
