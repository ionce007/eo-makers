const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const rootPath = process.cwd(); // 使用进程工作目录代替 __dirname

app.set('view engine', 'ejs');
app.set('views', path.join(rootPath, 'views'));
app.use(express.static(path.join(rootPath, 'public')));

// 解析JSON请求体
app.use(express.json());

// 跨域中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ========== 动态主页路由（重点） ==========
app.get('/', (req, res) => {
  // 后端传递动态数据给模板
  const pageData = {
    title: 'EdgeOne Makers Express 动态主页',
    serverName: 'Cloud Functions Node.js',
    time: new Date().toLocaleString('zh-CN'),
    author: 'Demo Project',
    list: ['Express', 'EJS模板', 'EdgeOne Makers', '服务端渲染']
  };
  // 渲染 views/index.ejs，传入变量
  res.render('index', pageData);
});

// ========== API接口 ==========
app.get('/api/hello', (req, res) => {
  const name = req.query.name || "访客";
  res.json({
    code: 0,
    data: { msg: `你好，${name}` }
  });
});

app.post('/api/post', (req, res) => {
  const body = req.body;
  res.json({
    code: 0,
    msg: "收到POST数据",
    data: body
  });
});

// API 404捕获
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    res.status(404).json({ code: -1, msg: "接口不存在" });
  } else {
    res.status(404).send('<h1>404 页面不存在</h1>');
  }
});

app.listen(PORT, () => {
  console.log(`服务启动，监听端口：${PORT}`);
});

module.exports = app;