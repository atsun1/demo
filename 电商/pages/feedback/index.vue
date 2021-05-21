<template>
	<view class="feedback">
		<view class="title">意见反馈</view>
		
		<uni-file-picker 
		    v-model="imageValue" 
		    fileMediatype="image" 
		    mode="grid" 
		    @select="select" 
		    @progress="progress" 
		    @success="success" 
		    @fail="fail" 
		/>
		<view>
		    <uni-file-picker  ref="files" :auto-upload="false"/>
		    <button @click="upload">上传文件</button>
		</view>
	</view>
</template>

<script>
	export default {
	    data(){
			return{
				imageStyles:{
					width:64,
					height:64,
					border:{
						color:"#ff5a5f",
						width:2,
						style:'dashed',
						radius:'2px',
					},
				},
			}
		},
		methods:{
			// 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},

			// 上传成功
			success(e){
				console.log('上传成功',e)
			},

			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			},
			 upload(){
				this.$refs.files.upload()
			}
		}
	}
</script>

<style>
</style>
