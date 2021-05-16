<template>
	<view class="pay">
		
		<view class="address">
			<button size="mini" @click="getAddress()" v-if="!address.userName">获取地址</button>
			<view v-else>
				<view>{{address.provinceName}} {{address.cityName}} {{address.countyName}} {{address.detailInfo}} </view>
				<view>{{address.userName}} {{address.telNumber}}</view>
			</view>
		</view>
		
		<view class="cart_list">
			<view class="list" v-for="(ite,index) in cart" :key="index">
<!-- 				<checkbox-group  class="check" @change="changecheck(ite.goods_id)">
					<label>
						<checkbox :target="index" :checked="ite.checked"  />
					</label>
				</checkbox-group> -->
				<view class="img">
					<image :src="ite.goods_small_logo" mode="widthFix"></image>
				</view>
				<view class="info">
					<view class="name">{{ite.goods_name}}</view>
					<view class="pAndb">
						<view class="price">￥{{ite.goods_price}}</view>
						<view class="btns">
							<!-- <text class="btn" @click="numedit(ite.goods_id,-1)" >-</text> -->
							<text>X {{ite.num}}</text>
							<!-- <text class="btn" @click="numedit(ite.goods_id,1)">+</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="footer">
		
			<view class="total">
				<view>合计：￥{{total}}</view>
			</view>
			<view class="sub" @click="pay">支付</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cart:[],
				address:{},
				total:0,
			}
		},
		onLoad(){
			let cart = uni.getStorageSync("cart")||[]
			this.total = 0;
			cart.forEach(v=>{
				if(v.checked){
					this.total += v.num * v.goods_price;
					// console.log(this.total,v.goods_price , v.num)
				}
			})
			// 进入支付页面的商品，在购物车中过滤掉
			let newcart = cart.filter(v=>!v.checked)
			uni.setStorageSync("cart",newcart);
			// 过滤缓存购物车内未勾选的商品
			cart = cart.filter(v=>v.checked)
			this.cart = cart;

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
			},
			pay(){
				if(!this.address.userName){
					uni.showToast({
						title:'您还没填写收货地址',
						icon:'none'
					})
					return
				}
				const token = uni.getStorageSync("token")
				if(!token){
					uni.navigateTo({
						url:'/pages/auth/index'
					})
					return
				}
				const header = {Authorization :token}
				const order_price = this.total;
				const consignee_addr = this.address.detailInfo
				const cart = this.cart ;
				let goods = []
				cart.forEach(v=>goods.push({
					goods_id : v.goods_id,
					goods_number : v.num,
					goods_price : v.goods_price
				}))
				const orderdata = {order_price,consignee_addr,goods};
				this.req({
					url:'/api/public/v1/my/orders/create',
					data:orderdata,
					method:"POST"
				}).then(res=>{
					console.log(res)
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.pay{
		.address{
			height:100rpx;
			display: flex;
			padding:50rpx 0;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			border-bottom: 1px solid $bgcolor;
			
		}
		.footer{
			position:fixed;
			bottom:0rpx;
			left:0;
			width: 100%;
			padding-bottom: var(--window-bottom);
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			height:100rpx;
			border-top: 1px solid #999;
		
			.total{
				flex:5;
				text-align:right;
				padding:0 20rpx;
				color:$bgcolor;
				font-weight: bold;
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
			
		.cart_list{
			.list{
				display: flex;
				justify-content: center;
				align-items: center;
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
				
					}
				}
		
			}
		}
	}
</style>
