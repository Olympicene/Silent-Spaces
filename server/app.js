import createError from "http-errors"
import cors from "cors"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path"
import express from "express"
import {PORT, URI} from "./config/index.js"

// dirname fix because i am lazy
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

// === config server ===
let app = express();

// === config header info ===
app.use(cors({origin: 'https://silentspaces.info' , credentials :  true})) // enables CORS
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//middle ware
app.use(express.json());

// === connect to database ===
// setup
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(URI, { // no idea what this does
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to database")) // we listen in www.js
  .catch((err) => console.log(err))

// === config routes ===
// when we want to link these routes, we import them and pass the app to the route
import { router as authRouter } from './routes/auth.js';
app.use('/auth', authRouter);

import { router as adminRouter } from './routes/admin.js';
app.use('/admin', adminRouter);

import { router as indexRouter } from './routes/index.js';
app.use('/', indexRouter);

import { router as spaceRouter } from './routes/space.js';
app.use('/space', spaceRouter);

import { router as reviewRouter } from './routes/review.js';
app.use('/review', reviewRouter);

import { router as userRouter } from './routes/user.js';
app.use('/user', userRouter);

import { router as checkinRouter } from './routes/checkin.js';
app.use('/checkin', checkinRouter);

// === view engine setup ===
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jade');
app.use(express.static(`${__dirname}/views`));

// === error handling ===
// catch 404
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development

  console.log(err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export { app }
