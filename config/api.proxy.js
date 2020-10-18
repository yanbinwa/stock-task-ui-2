'use strict'

module.exports = {
  '/stock_task': {
    target: 'http://localhost:1700',
    changeOrigin: true,
    pathRewrite: { '^/stock_task': '' }
  }
}
