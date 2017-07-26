const path = require('path');
const express = require('express');
const nunjucks = require('nunjucks');
const compression = require('compression');
const configureRoutes = require('./routes');
const createRepository = require('./repository');
const connectMongo = require('./utils/connectMongo');

const app = express();

nunjucks.configure(path.resolve(__dirname, 'templates'), {
  express: app,
});

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const {execSync} = require('child_process');
  const webpackConfig = require('../webpack.config.dev.js');
  const compiler = webpack(webpackConfig);

  execSync('npm run compile-front-dev');

  app.use(require('webpack-dev-middleware')(compiler));
  app.use(require('webpack-hot-middleware')(compiler));
}

const assets = require('../dist/webpack-assets.json');

app.use(compression());
app.use(express.static(path.join(__dirname, '../dist')));

const mongoUrl = process.env.MONGODB_URL ||
  `mongodb://localhost:27017/characters-challenge`;

connectMongo(mongoUrl)
  .then((mongoClient) => {
    const repository = createRepository(mongoClient);

    configureRoutes(app, repository);

    app.get('*', (req, res) => {
      res.render('index.html', {
        assets: assets.main,
      });
    });
  });

module.exports = app;
