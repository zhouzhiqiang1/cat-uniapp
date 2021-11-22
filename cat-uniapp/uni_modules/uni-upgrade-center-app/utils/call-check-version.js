export default function() {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
			console.log("基础接口请求",plus.runtime.appid);
			console.log("基础接口请求",plus.runtime.version);
			console.log("基础接口请求",widgetInfo.version);
			uniCloud.callFunction({
				name: 'check-version',
				data: {
					appid: plus.runtime.appid,
					appVersion: plus.runtime.version,
					wgtVersion: widgetInfo.version
				},
				success: (e) => {
					console.log("成功信息: ",e);
					resolve(e)
				},
				fail: (error) => {
					console.log("报错信息: ",e);
					reject(error)
				},
			})
		})
	})
	// #endif
	// #ifndef APP-PLUS
	return new Promise((resolve, reject) => {
		reject({
			message: '请在App中使用'
		})
	})
	// #endif
}
