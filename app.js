var createError = require("http-errors");
var express = require("express");
var helmet = require("helmet");
var compression = require("compression");
var cors = require("cors");
var xss = require("xss-clean");
var mongoSanitize = require("express-mongo-sanitize");

const { errorHandler } = require("./middlewares/error");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var listRouter = require("./routes/list");

var app = express();

var dbconfig = require("./config/dbconfig");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(helmet());

app.use(logger("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 1000000 }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// santiize request data
app.use(xss());
app.use(mongoSanitize());

// compress all request and responses
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors()); // allow all the origins to access the API

// Configure routes
app.use("/", indexRouter);
app.use("/list", listRouter);

// handle error
app.use(errorHandler);

// Connect to database
dbconfig.connecttoDB();

module.exports = app;
