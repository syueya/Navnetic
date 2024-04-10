# 使用轻量级基础镜像 node:16-alpine
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install --production

# 将 Express 应用程序源代码复制到镜像中，排除 node_modules 文件夹
COPY --chown=node:node . ./


# 创建两个匿名卷
VOLUME /app/public/images
VOLUME /app/public/assets

# 增加作者信息
LABEL author="夏夏子"

# 暴露应用程序运行的端口
EXPOSE 3000

# 执行启动脚本
CMD npm start
