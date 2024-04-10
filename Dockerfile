# 第一阶段：安装依赖并构建
FROM node:16-alpine AS build

# 设置工作目录
WORKDIR /app

# 复制整个项目并构建
COPY . .

# 运行 npm install 安装依赖
RUN npm install

# 运行 npm run build 构建项目
RUN npm run build


# 第二阶段：仅复制构建后的文件
FROM node:16-alpine AS final
WORKDIR /app

# 复制第一阶段构建后的文件，排除开发依赖和 node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public


# 创建两个匿名卷
VOLUME /app/public/images
VOLUME /app/public/assets

# 增加作者信息
LABEL author="夏夏子"

# 暴露应用程序运行的端口
EXPOSE 3000

# 执行启动脚本
CMD npm start
