<template>
	<view class="user">
		<view class="login" v-if="!userdata.nickName">
			<button type="default" class="btn" open-type="getUserInfo" @getuserinfo="userinfo" >登录</button>
		</view>
		<view class="top" v-if="userdata.nickName">
			<view class="name">
				<view>{{userdata.nickName}}</view>
			</view>
			<view class="picture">
				<image :src="userdata.avatarUrl" mode="widthFix"></image>
			</view>
		</view>
		
		<!-- 功能区 -->
		<view class="editbox">
			<!-- 四个常用按钮 -->
			<view class="orderedit">
				<view>
					<navigator url="/pages/order/index?type=0">
						<uni-icons type="settings" size="30"></uni-icons>
						<view>全部订单</view>
					</navigator>
				</view>
				<view>
					<navigator url="/pages/order/index?type=1">
						<uni-icons type="info" size="30"></uni-icons>
						<view>待付款</view>
					</navigator>
				</view>
				<view>
					<navigator url="/pages/order/index?type=2">
						<uni-icons type="cart-filled" size="30"></uni-icons>
						<view>待收货</view>
					</navigator>
				</view>
				<view>
					<navigator url="/pages/order/index?type=3">
						<uni-icons type="pengyouquan" size="30"></uni-icons>
						<view>退货/退款</view>
					</navigator>
				</view>
			</view>
			<!-- 功能列表 -->
			<view>
				<uni-list>
					<uni-list-item title="收藏列表" clickable show-badge="true" link to="/pages/collect/index" :badge-text="starlength"></uni-list-item>
				    <uni-list-item title="联系客服" clickable ></uni-list-item>
				    <uni-list-item title="意见反馈" clickable ></uni-list-item>
				    <uni-list-item title="关于我们" clickable ></uni-list-item>
					<uni-list-item title="列表右侧显示角标" show-badge="true" badge-text="12" ></uni-list-item>
					<uni-list-item title="列表右侧显示 switch"  :show-switch="true"  @switchChange="switchChange" ></uni-list-item>
					<uni-list-item title="默认 navigateTo 方式跳转页面" link to="/pages/vue/index/index"  ></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				userdata:{},
				// starlist:[],
				starlength:0
			}
		},
		onShow(){
			let starlist = uni.getStorageSync('starlist')||[]
			console.log(starlist.length)
			// starlist.map(v=>v.goods_id = v.goods_id.toString())
			// this.starlist = starlist
			this.starlength = starlist.length.toString()
			console.log(starlist.length)
		},
		methods:{
			userinfo(e){
				this.userdata = e.detail.userInfo;
				console.log(this.userdata,e)
				
			}
		}
		
	}
</script>

<style lang="scss">
	.user{
		.login{
			background-color: $bgcolor;
			display: flex;
			height:300rpx;
			justify-content: center;
			align-items:center;
				.btn{
					width: 150rpx;
					height:150rpx;
					line-height: 150rpx;
					border:3px solid #F0AD4E;
					border-radius: 50%;
					font-size: 28rpx;
				}
		}
		.top{
			background-color: $bgcolor;
			height:250rpx;
			display: flex;
			justify-content: space-between;
			align-items:flex-end;
			padding:40rpx 50rpx;
			.name{
				display: flex;
				align-items: flex-end;
				color:#fff;
				font-size: 34rpx;
			}
			.picture{
				width: 150rpx;
				height:150rpx;
					image{
						width: 100%;
						border-radius: 50%;					
					}
			}
		}
		.editbox{
			.orderedit{
				display: flex;
				padding:30rpx 0;
				margin-bottom: 10px;
				-moz-box-shadow: 5px 5px 8px #999;
				box-shadow: 5px 5px 8px #999;
				 view{
					flex: 1;
					font-size: 28rpx;
					text-align: center;
				}
			}
		}
	}
</style>
