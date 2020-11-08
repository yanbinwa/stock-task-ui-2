'use strict'

module.exports = {
  '/stock_task': {
    target: 'http://localhost:7879',
    changeOrigin: true,
    pathRewrite: { '^/stock_task': '' }
  },
  '/stock_admin': {
    target: 'http://localhost:7879',
    changeOrigin: true,
    pathRewrite: { '^/stock_admin': '' }
  }
}
