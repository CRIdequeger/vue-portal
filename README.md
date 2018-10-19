# vue-portal

> 一个vue的练手小项目

## 运行步骤

web server依赖mongodb 请保证mongodb 运行在 localhost:27017

``` bash
# 安装前端依赖
(项目根目录下)
npm install

# 安装web server依赖, 并编译
1. cd server/
2. npm install
3. gulp dev

# 启动web server
1. gulp dev
2. nodemon --inspect ./dist/

# 启动前端工程
(项目根目录下)
npm run dev
