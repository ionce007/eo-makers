const express = require('express');
const app = express();

app.get('*', (req, res) => {
  res.send(`✅ Node服务正常收到请求, PATH:${req.path}`);
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("start"));
}
module.exports = app;