'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST:'0.0.0.0',
  VUE_APP_BASE_API:'"/api"',
  VUE_DEBUG: true,
  DT_CORP_ID:'"ding27ee946c13e5554535c2f4657eb6378f"'
})
