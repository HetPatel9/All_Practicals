const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
const cors = require('cors');
const { I18n } = require('i18n');
const router = require('./router');

const globalErrorHandler = require('./Controller/errorController');

const cookieParser = require('cookie-parser');
const app = express();
const i18n = new I18n({
  locales: ['eng', 'guj', 'hindi'],
  directory: path.join(__dirname, 'translate'),
  defaultLocale: 'eng'
});
app.use(express.urlencoded({ extended: true }));

app.use(i18n.init);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);
app.all('*', (req, res, next) => {
  next(new appError(`Page ${req.originalUrl} not Found`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
