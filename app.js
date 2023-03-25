const express = require('express');
const app = express();
const router = express.Router();

const path = __dirname + '/src';
const port = 8080;

router.get('/dist/output.css', function (_, res) {
  res.sendFile(__dirname + '/dist/output.css');
});

app.use(express.static(path));
app.use('/', router);

app.listen(port, function () {
  console.log(`app is listening on port ${port}...`);
});
