const { CategoriesService, ProductsService } = require('./services');

const path = require('path');
const logger = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/product');

const app = express();

const categoriesService = new CategoriesService()
const productsService = new ProductsService()

app.locals.services = {
  categories: categoriesService,
  products: productsService
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', productsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.redirect("/")
});

module.exports = app;
