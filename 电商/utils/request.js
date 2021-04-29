const serve = 'https://api-hmugo-web.itheima.net';


export default (params)=>{

console.log(serve+params.url)
	return new Promise((resolve,reject)=>{

		uni.request({
			url : serve + params.url,
			data : params.data,
			success:(res)=>{
				resolve(res);
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}