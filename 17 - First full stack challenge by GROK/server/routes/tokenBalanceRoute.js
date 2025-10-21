import express from 'express';
import { getTokenBalance } from '../controllers/tokenBalanceController.js';

const router = express.Router();

// GET /api/token/balance?address=0x...
router.get('/balance/:address', getTokenBalance);

export default function tokenBalanceRoute(app) {
  app.use('/api/token', router);
}
