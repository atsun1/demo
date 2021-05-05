<template>
	<view>
		<search></search>
		<tabs :tabdata="tabs" @tabid="tabid">
			<block v-if="tabs[0].isAct">1</block>
			<block v-if="tabs[1].isAct">2</block>
			<block v-if="tabs[2].isAct">3</block>

		</tabs>
		
	</view>
</template>

<script>
	import tabs from '@/components/tabs.vue';
	import search from '@/components/search.vue';
	export default{
		components:{
			search,
			tabs,
		},
		data(){
			return{
				tabs:[
					{
						id:0,
						value:"综合",
						isAct:true,
					},
					{
						id:1,
						value:"销量",
						isAct:false,
					},
					{
						id:2,
						value:"价格",
						isAct:false,
					}
				],
			}
		},
		onLoad(e){
			console.log(e);
		},
		methods:{
			tabid(id){
				// console.log(id);
				this.tabs.map(
					(ite)=>{
						ite.id === id?ite.isAct=true:ite.isAct=false
						// console.log(ite,i);
					}
				)
			}
		}
	}
</script>

<style>
</style>
