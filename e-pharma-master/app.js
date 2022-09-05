/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';

import path from 'path';
import cors from 'cors';

import userRoutes from './src/routes/user.route';
import categorieRoutes from './src/routes/categorie.route';
import addressRoute from './src/routes/address.route';
import diseaseRoute from './src/routes/disease.route';
import productRoute from './src/routes/product.route';
import cartRoutes from './src/routes/cart.route';
import orderRoutes from './src/routes/order.routes';
import placedOrderRoutes from './src/routes/placedOrder.routes';

const session = require('express-session');
const cookieParser = require('cookie-parser');

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.resolve(__dirname, './src/public')));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));
app.use(cors());
app.use(session({
  secret: process.env.SECRET,
  secure: true,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000, secure: true },
}));
app.use(cookieParser());
app.use('/', userRoutes);
app.use('/', categorieRoutes);
app.use('/', addressRoute);
app.use('/', diseaseRoute);
app.use('/', productRoute);
app.use('/', orderRoutes);
app.use('/', cartRoutes);
app.use('/', placedOrderRoutes);

module.exports = app;
