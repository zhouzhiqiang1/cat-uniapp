class Globalunit{
	constructor() {
		this.downloadurl = "xxxxxxxxxxxxxxx";//分享地址


		
		//裂变分享功能需配置以下几项
		this.domainName = ""; //分销裂变下载页的域名
		this.appName = "萌猫成长"//app名称
		this.share = {
			title:"萌猫成长",//分享标题
			summary:"萌猫成长是一款趣味合成类网赚游戏。",//描述
			imageUrl:"xxxxxxxxxxxxxxxx"//缩略图
		}
		//下载页面信息
		this.about = {
			logo:"xxxxxxxxxxxxxxxxxx",//app-logo
			appName:"萌猫成长",//app名称
			slogan:"趣味合成类网赚游戏",//描述
			company:"xxxxxxxxxxxxxx"//公司名称
		}
		//裂变分享功能需配置以上几项
		
		
		
		this.iosMarketId = "id12345678";//appStore下载地址最后id
		this.androidMarketId = "xxxxxxxxxxx";//Android上架应用市场应用的包名
		
		this.interstitialAdpid = "1111111113";// 插屏广告测试广告位 ：1111111113，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
		this.bannerAdpid = "1111111111"; // 我的页面、喵喵团页面，信息流测试广告位：1111111111，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
	}
}
export default new Globalunit()