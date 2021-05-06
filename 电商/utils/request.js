const serve = 'https://api-hmugo-web.itheima.net';


export default (params)=>{


uni.showLoading({
	title: '加载中',
	mask:true,
});

console.log(serve+params.url,params.data)
	return new Promise((resolve,reject)=>{

		uni.request({
			url : serve + params.url,
			data : params.data,
			success:(res)=>{
				resolve(res);
			},
			fail:(err)=>{
				reject(err)
			},
			complete:()=>{
				uni.hideLoading();
				
			}
		})
	})
}