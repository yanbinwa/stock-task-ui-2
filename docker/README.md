# DOCKER BUILD

该文件夹处理 `docker build` 功能

## 使用前阅读

### 构建前：
1. 需要更新 `build.env` 中的 `CONTAINER`为自己项目的镜像名称 `PROJECT` 更新为自己项目的项目名称（docker harbor的project）
2. `Dockerfile` 默认只载入`index.html`文件，如果时多页面项目需更新 `Dockerfile` 文件
3. `nginx.conf.template` 只添加了默认的配置，如需更多代理配置，请添加
4. `run_nginx.sh` 会传入必要的环境变量，如在 `nginx` 有更多的代理配置，环境变量统一从此文件传入

## 文件结构描述

```markdown
docker
├─Dockerfile // 构建镜像的dockerfile
├─README.md // 
├─build.env // 镜像构建的基础变量
├─build.sh // 镜像构建脚本
├─docker-compose.yml // 启动容器的docker compose文件
├─entrypoint.sh // 镜像的启动的entrypoint入口脚本
├─health_check.sh // 健康检查脚本
├─kill-supervisor.sh // 清除supervisor进程
├─run.env // 启动容器的环境变量信息
├─run_nginx.sh // 容器运行时，启动nginx脚本（传入环境变量）
├─run_start.sh // 本地启动的start脚本
├─conf //配置信息
|  ├─nginx.conf.template // nginx配置模版
|  └supervisord.conf // supervisord
```


