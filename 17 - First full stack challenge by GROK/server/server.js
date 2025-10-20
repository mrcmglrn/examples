import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import tokenBalanceRoute from './routes/tokenBalanceRoute.js';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 3333;

// Middleware
const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
  ]
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

tokenBalanceRoute(app);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

export default app;
