<template>
	<view class="cart">
		<view v-if="isShow">
			<view class="cart_list">
				<view class="list" v-for="(ite,index) in cart" :key="index">
					<checkbox-group  class="check" @change="changecheck(ite.goods_id)">
						<label>
							<checkbox :target="index" :checked="ite.checked"  />
						</label>
					</checkbox-group>
					<view class="img">
						<image :src="ite.goods_small_logo" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="name">{{ite.goods_name}}</view>
						<view class="pAndb">
							<view class="price">￥{{ite.goods_price}}</view>
							<view class="btns">
								<text class="btn" @click="numedit(ite.goods_id,-1)" >-</text>
								<text>{{ite.num}}</text>
								<text class="btn" @click="numedit(ite.goods_id,1)">+</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<view v-if="!isShow" class="nonegoods">
			<image src="@/static/nonegoods.png" mode="widthFix"></image>
		</view>
		
		
		<view class="footer">
			<checkbox-group @change="allchecked" class="check">
				<label>
					<checkbox :checked="allcheck" /><text>全选</text>
				</label>
			</checkbox-group>
			<view class="total">
				<view>合计：￥{{total}}</view>
			</view>
			<view class="sub" @click="pay">结算</view>
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
				isShow:false,
				goodsNum:0,
				
			}
		},
		onShow(){
			this.update();
			
		},
		methods:{
	
			update(){
				let cart = uni.getStorageSync("cart")||[]
				//判断是否显示 无购物车内容图片 
				cart.length?this.isShow=true:this.isShow=false;
				let  allcheck = cart.length?cart.every(v=>v.checked):false
				this.allcheck = allcheck;
				this.total = 0;
				this.goodsNum = 0;
				cart.forEach(v=>{
					if(v.checked){
						this.total += v.num * v.goods_price;
						this.goodsNum += v.num;
						// console.log(this.total,v.goods_price , v.num)
					}
				})
				this.cart = cart;
				// console.log(cart,allcheck,this.total);
				uni.setStorageSync("cart",cart)
			},
			changecheck(e){
				let cart = uni.getStorageSync("cart")||[]
				// console.log(cart)
				let index =cart.findIndex(v=>v.goods_id ==e);
				// console.log(index)
				cart[index].checked = !cart[index].checked;
				// this.cart = cart;
				uni.setStorageSync("cart",cart);
				this.update();
			},
			
			allchecked(e){
				console.log(e,this.allcheck)
				this.allcheck = !this.allcheck;
				this.cart.map(v=>v.checked=this.allcheck)
				// if(this.allcheck){
				// 	cart.map(v=>v.checked=false)
				// }else{
				// 	cart.map(v=>v.checked=true)
				// }
				uni.setStorageSync("cart",this.cart);
				this.update();
			},
			numedit(id,btn){
				console.log(id,btn)
				let cart = uni.getStorageSync("cart")||[]
				let index =cart.findIndex(v=>v.goods_id ==id);
					cart[index].num += btn;
				if(cart[index].num==0){
					uni.showModal({
					    title: '确认移除该商品吗',
					    success: (res)=> {
					        if (res.confirm) {
								cart.splice(index,1);
					        } else if (res.cancel) {
					            cart[index].num = 1
					        }
					    },
						complete:()=>{
							uni.setStorageSync("cart",cart);
							this.update();
						}
					});
				}
				uni.setStorageSync("cart",cart);
				this.update();
			},
		
			pay(){
				if(!this.goodsNum){
					uni.showToast({
						title:'你的购物车空空如也',
						icon:'none'
					})
					return
				}
				uni.navigateTo({
					url:'/pages/pay/index'
				})
				
				// this.update();
			}
		},
		
	}
</script>

<style lang="scss">
	.cart{
		.nonegoods{
			display: flex;
			justify-content: center;
			align-items: center;
			height:80vh;
				image{width: 100%;}
		}

		.cart_list{
	
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
			.check{
				flex:2;
				font-size: 28rpx;
				padding:0 20rpx;
			}
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
	
	}
	
</style>
