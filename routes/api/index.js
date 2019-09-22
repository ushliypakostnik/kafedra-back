import { Router } from 'express';
import fs from 'fs-extra';
import path from 'path';

import config from '../../config';

const router = Router();

// GET songs
router.get('/songs', (req, res, next) => {
  const fileAbsPath = path.resolve(config.TARGET_PATH, config.TARGET);
  let songs = {"songs":[]};

  try {
    songs = JSON.parse(fs.readFileSync(fileAbsPath, 'utf8'));
  }
  catch (err) {
    throw err;
  }
  finally {
    return res.status(200).json(songs);
  }
});

export default router;
