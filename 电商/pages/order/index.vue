<template>
	<view class="order">
		<tabs :tabdata="tabdata" @tabid="tabid" ></tabs>
		<block class="orderlist" v-if="tabdata[0].isAct">
			<uni-list-item title="全部订单列表" note="全部订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="全部订单列表" note="全部订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="全部订单列表" note="全部订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="全部订单列表" note="全部订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="全部订单列表" note="全部订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="全部订单列表" note="全部订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
		</block>
		<block class="orderlist" v-if="tabdata[1].isAct">
			<uni-list-item title="待付款订单列表" note="待付款订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
		</block>
		<block class="orderlist" v-if="tabdata[2].isAct">
			<uni-list-item title="待发货订单列表" note="待发货订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="待发货订单列表" note="待发货订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="待发货订单列表" note="待发货订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
		
		</block>
		<block class="orderlist" v-if="tabdata[3].isAct">
			<uni-list-item title="退换货订单列表" note="退换货订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			<uni-list-item title="退换货订单列表" note="退换货订单列表" thumb="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" thumb-size="lg" rightText="右侧文字"></uni-list-item>
			
		</block>
		
	</view>
</template>

<script>
	import tabs from '@/components/tabs.vue';
	export default{
		components:{
			tabs
		},
		data(){
			return {
				tabdata:[
					{
						id:0,
						value:'全部',
						isAct:true,
					},
					{
						id:1,
						value:'待付款',
						isAct:false,
					},
					{
						id:2,
						value:'待发货',
						isAct:false,
					},
					{
						id:3,
						value:'退款/退货',
						isAct:false,
					},
				],
				// tabid:0,
			}
		},
		onLoad(e) {
			// console.log(e.type);
			// this.tabtype = e;
			this.tabdata.map(v=>{
				console.log(v.id,e.type)
				v.id ==e.type?v.isAct=true:v.isAct=false
			})
		},
		methods:{
			tabid(e){
				console.log(e)
				this.tabdata.map(v=>{
					v.id ===e?v.isAct=true:v.isAct=false
				})
			}
		}
	}
</script>

<style lang="scss">
	.order{
		.orderlist{
			height:100vh;
			background-color: #999;
		}
	}
</style>
