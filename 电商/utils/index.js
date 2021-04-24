export const req = (params)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			...params,
			success:(res)=>{
				resolve(res);
			},
			fail:(err)=>{
				reject(err)
			}
		})
	})
}