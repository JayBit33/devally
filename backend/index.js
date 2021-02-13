const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const users = require('./apis/users');
const auth = require('./auth');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('mycatsarealwayssilly')); // process.env.COOKIE_SECRET set secret as env var
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8081'
}));
app.use(express.json());

app.use('/auth', auth);
app.use('/api/v1/users', users);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
})

app.listen(port, () => console.log('server listening...'));

module.exports = app;
