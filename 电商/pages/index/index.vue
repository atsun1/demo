<template>
	<view class="home">
		<search></search>
		
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
	
		<navigator url="pages/search/index" >
		        <button type="default">跳转到新页面</button>
		</navigator>
	</view>
</template>

<script>
	import search from '../../components/search.vue';
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		},
		components:{
			search
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		color:$bgcolor;
	}
</style>
