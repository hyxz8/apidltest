const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// 目标API地址
const TARGET_API = 'https://123.com'; 

// 配置代理中间件
const apiProxy = createProxyMiddleware({
  target: TARGET_API,
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // 清除原有的所有请求头
    const headerNames = Object.keys(proxyReq.getHeaders());
    headerNames.forEach(name => {
      // 保留Authorization和Content-Type头，删除其他所有头
      if (name !== 'authorization' && name !== 'content-type') {
        proxyReq.removeHeader(name);
      }
    });
  }
});

// 将所有请求代理到目标服务器
app.use('/', apiProxy);

// 启动服务器
app.listen(process.env.PORT || 3000);
