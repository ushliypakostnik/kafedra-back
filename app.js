import express from 'express';

import cors from 'cors';
import url from 'url';

import config from './config';

import router from './routes/index';

const app = express();

// CORS
if (config.CORS_ENABLED) {
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
      callback(null, origin);
    }
  }

  app.use(cors(corsOptions));
}

// Static
if (config.STATIC_SERVE) {
  const mediaURL = new url.URL(config.MEDIA_URL);
  app.use(mediaURL.pathname, express.static(config.MEDIA_DIR));
}

app.use(router);

export default app;
