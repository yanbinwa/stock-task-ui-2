'use strict'

module.exports = {
  '/stock_task': {
    target: 'http://192.168.1.10:7879',
    changeOrigin: true,
    pathRewrite: { '^/stock_task': '' }
  },
  '/stock_admin': {
    target: 'http://192.168.1.10:7879',
    changeOrigin: true,
    pathRewrite: { '^/stock_admin': '' }
  }
}
