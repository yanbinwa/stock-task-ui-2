#!/bin/sh
cd /etc/nginx
rm nginx.conf

# NAMESERVER 制定DNS服务，环境变量由脚本获取填充不需要额外配置
# GEMINI_TA_UI_PORT 产品模块的端口号，需在启动docker时添加此环境变量
# PRODUCT_ROUTE 产品模块的路由地址，例如：ccbot，需在启动docker时添加此环境变量
envsubst '
$$NAMESERVER
$$STOCK_TASK_UI_PORT
$$STOCK_ADMIN_URL
$$STOCK_TASK_URL
' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
nginx -t
nginx -g "daemon off;"
