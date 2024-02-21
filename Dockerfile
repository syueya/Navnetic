# 使用 Node.js 官方镜像，选择适合您的版本
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到工作目录
COPY package*.json ./


# 安装项目依赖
RUN npm install --production


# 将所有项目文件复制到工作目录
COPY . .

# 创建两个匿名卷
VOLUME /app/public/images
VOLUME /app/public/assets

# 增加作者信息
LABEL author="夏夏子"

# 暴露应用程序运行的端口
EXPOSE 3000

# 执行启动脚本
CMD ["npm", "start"]
