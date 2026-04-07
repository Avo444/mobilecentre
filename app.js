const {
    BankService,
    CartService,
    UsersService,
    OrdersService,
    ProductsService,
    CategoriesService,
} = require("./services");

const path = require("path");
const logger = require("morgan");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");

const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const banksRouter = require("./routes/bank");
const ordersRouter = require("./routes/orders");
const authRouter = require("./routes/auth");

const app = express();

const bankService = new BankService();
const cartService = new CartService();
const usersService = new UsersService();
const ordersService = new OrdersService();
const productsService = new ProductsService();
const categoriesService = new CategoriesService();

app.locals.services = {
    bank: bankService,
    cart: cartService,
    users: usersService,
    orders: ordersService,
    products: productsService,
    categories: categoriesService,
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);
app.use("/api/bank", banksRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/auth", authRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    res.redirect("/");
});

module.exports = app;
