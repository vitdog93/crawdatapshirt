import express from 'express';
import http from 'http';
// const siteMap = require("./getIndexSitemap");
// import { getProduct } from './productdetail';
import routerExport from './router/exportProducts.js';
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);





app.set('view engine', 'ejs');

app.use('/export-products', routerExport);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// handle uncaught exceotions
process.on('uncaughtException',err => {
  console.error('There was an uncaught error', err);
});
