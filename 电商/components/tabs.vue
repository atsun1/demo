<template>
	<view>
		<view class="tabs">
			<view v-for="(ite , index) in tabdata" :key="index" :class="{act:ite.isAct}" @click="rank(ite.id)">
				{{ite.value}}
			</view>
		</view>
		<view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			tabdata:Array
		},
		methods:{
			rank(e){
				// console.log(e);
				this.$emit('tabid',e)
			}
		}
	}
</script>

<style lang="scss">
	.tabs{
		display: flex;
		flex-wrap: wrap;
		
		view{
			flex:1;
			height:70rpx;
			line-height: 70rpx;
			text-align: center;
			font-size: 28rpx;
			// border-bottom:2px solid #666;
		}
		.act{
			color:red;
			border-bottom:2px solid red;
		}
		
	}
</style>
