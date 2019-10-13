import path from 'path';

const env = process.env.NODE_ENV;

if (env === 'production') {
  require('dotenv').config();
}

const absJSONTargetPath = path.resolve(__dirname, 'audio');

const common = {
  PORT: process.env.PORT || 8082,
  MEDIA_DIR: process.env.MEDIA_DIR || 'audio',
  TARGET_PATH: process.env.TARGET_PATH || absJSONTargetPath,
  TARGET: process.env.TARGET || 'songs.json',
};

const development = {
  ...common,
  HOST: process.env.HOST || 'http://localhost:8082',
  MEDIA_URL: process.env.MEDIA_URL || 'http://localhost:8082/audio',
  STATIC_SERVE: process.env.STATIC_SERVE || true,
  CORS_ENABLED: process.env.CORS_ENABLED || true,
};

const production = {
  ...common,
  HOST: process.env.HOST || 'https://backend.kafedra.org',
  MEDIA_URL: process.env.MEDIA_URL || 'https://backend.kafedra.org/media',
  STATIC_SERVE: process.env.STATIC_SERVE || false,
  CORS_ENABLED: process.env.CORS_ENABLED || false,
};

const config = {
  development,
  production,
};

export default config[env];
