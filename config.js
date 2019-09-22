import path from 'path';

require('dotenv').config();

const env = process.env.NODE_ENV;

const absJSONTargetPath = path.resolve(__dirname, 'audio');

const common = {
  PORT: process.env.PORT || 8082,
  MEDIA_DIR: process.env.MEDIA_DIR || 'media',
  STATIC_SERVE: process.env.STATIC_SERVE || false,
  TARGET_PATH: process.env.TARGET_PATH || absJSONTargetPath,
  TARGET: process.env.TARGET || 'songs.json',
};

const development = {
  ...common,
  HOST: process.env.HOST || 'http://localhost:8082',
  MEDIA_URL: process.env.MEDIA_URL || 'http://localhost:8082/media',
  CORS_ENABLED: process.env.CORS_ENABLED || true,
};

const production = {
  ...common,
  HOST: process.env.HOST || 'https://express-auth.kafedra.org',
  MEDIA_URL: process.env.MEDIA_URL || 'https://express-auth.kafedra.org/media',
  CORS_ENABLED: process.env.CORS_ENABLED || false,
};

const config = {
  development,
  production,
};

export default config[env];
