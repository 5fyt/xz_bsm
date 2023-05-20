// export const BASE_URL='http://codercba.prod:8000'
/*
由于要区分生产环境地址还是开发环境地址一般采用三种方式
vite
     1、import.meta.env.mood 来判断是哪种开发环境 生产环境 production 开发环境dev
     2、import.meta.env.PROD  import.meta.env.DEV  这两种是Boolean类型的且一直保持相反
     3、在文件夹创建.env文件 这个文件开发模式和生产模式都能访问得到，
        .env[mode] 文件 .env.development 只有开发环境下才能访问得到 .env.production 生产环境下能访问到
        .env[mode].local git 会忽略该文件打包时
*/

// export const BASE_URL='http://coderwhy.dev:8000'
let BASE_URL = ''
// console.log(import.meta.env.DEV); //

if (import.meta.env.PROD) {
	// 生产环境
	BASE_URL = '/api'
} else {
	// 开发环境
	BASE_URL = '/api'
}
// console.log(BASE_URL);
//console.log(import.meta.env.VITE_URL); //dev


export const TIME_OUT = 10000
export { BASE_URL }
