/**
 * @file 项目全局配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
export default {
  view: 'sveltekit',
  server: {
     port: 8080,
     proxy: {
       // 如果是 /api 打头，则访问地址如下
       '/api': {
         target: 'https://www.baidu.com',
         changeOrigin: true,
         rewrite: path => path.replace(/^\/api/, '')
       },
     },
  }
} 
 