这是App升级检查的云函数实现示例，可用于开启`uniCloud`的`uni-app`项目，也可以用于传统的`mui`或`5+ App`项目。

使用说明：

1. 使用HBuilderX导入本插件到本地`uniCloud`项目中
2. 上传云函数到自己的服务空间
3. 修改`db_init.js`文件，修改appid及当前版本号，在`db_init.json`上右键初始化数据，更多用法参考[db_init.json规范](https://uniapp.dcloud.net.cn/uniCloud/cf-database?id=db)
4. 在开通`uniCloud`服务的前端项目中，调用检查更新，代码示例如下：

```
plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
	uniCloud.callFunction({
	  name: 'check-update',
	  data: {
	    appid: plus.runtime.appid,
		appVersion: plus.runtime.version,
		runtimeVersion: plus.runtime.uniVersion,
	    wgtVersion: widgetInfo.version
	  },
	  success(e) {
	    if (e.result.code > 0) {//需要更新
	      // 提醒用户更新
	      uni.showModal({
	        title: '更新提示',
	        content: e.result.title ? e.result.title : '是否选择更新',
	        success: (ee) => {
	          if (ee.confirm) {
	            plus.runtime.openURL(e.result.url);
	          }
	        }
	      })
	    }
	  }
	})
});

```

5. 如果是mui或5+ 项目，也可以通过[云函数URL化](https://uniapp.dcloud.net.cn/uniCloud/http)实现App端的更新检查

`注意事项：`
> - 可以使用 `patch` 来判断是使用`整包更新`还是`wgt更新`
> - 使用`wgt更新`注意：
> - 	1. `HBuilder版本`，注意新的语法使用
> -		2. 使用`plus.runtime.install`安装后，`必须`执行 `plus.runtime.restart()`，否则新的内容并不会生效。
> -		3. 使用`plus.runtime.install`
> - 更多[注意事项](https://ask.dcloud.net.cn/article/35667)请点击查看



## 升级文档

> 统一升级方案，使用uniCloud配置数据库，即可使用

```js
plus.runtime.version 		// 未打包是基座版本，打包后是mainfest.json
或
uni.getSystemInfoSync().version	// 等于 plus.runtime.innerVersion

plus.runtime.uniVersion	// HBuilder版本 runtime_version

plus.runtime.getProperty(appid,wgtInfo) wgtInfo.version	// wgt热更新包版本

{
	title:'',
	contents:[],
	version:'',
	url:'',
	wgt_url:'',
	runtime_version:'',
	platform:'',
	create_date:''
}
```

一、自己维护版本，不依赖其他版本号

1. 打包后，需要更新`version`、`runtime_version`字段
	- 如果本次打包使用了新的api，则需要更新`runtime_version`，如果上次的更新`runtime_version`大于此api支持的HX版本，则不需要更改此字段，否则需要更新为这个api支持的HX版本
	- 如果没有使用新的api，则全量和wgt都可更新。如果打wgt包，则需要配置wgt_url字段值

2. 校验
> 前端`callFunction`时需要将`appid`、`version`、`wgt_version`，`runtime_version`作为参数传递
	1. 先校验`version`和`wgt_version`是否和当前最新版本匹配，查看是否有更新
	2. 检验`runtime_version`和库里版本是否匹配，相等 可使用wgt更新，小于 只可整包