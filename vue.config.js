module.exports = {
	outputDir:'dist/pride',
	publicPath: process.env.NODE_ENV === 'production' ? '/pride/' : '/',
	// indexPath: process.env.NODE_ENV === 'production' ? '../dist/pride/index.html' : '/',
	// assetsDir: process.env.NODE_ENV === 'production' ? '../dist/pride' : '/',
	lintOnSave: false,
	productionSourceMap: false,
	devServer: {
		proxy: {
			'^/api': {
				target: 'http://localhost:8000',
				ws: true,
				changeOrigin: true
			},
			'^/file': {
				target: 'http://localhost:8000',
				ws: true,
				changeOrigin: true
			}
		}
	},
	css: {
	    loaderOptions: {
	    	less: {
	    		javascriptEnabled: true
	    	}
	    }
	}
	// transpileDependencies: [
	// 	'vue-echarts',
	// 	'resize-detector'
	// ],
	// runtimeCompiler:true
}
