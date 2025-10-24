// With ESM the module tree is loaded before executing the main file code!
// In this way, we prevent this problem by loading dotenv at the very beginning.
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.SERVER_PORT || 3333;

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

// Routing
import myCollectionRoute from './routes/myCollectionRoute.js';
myCollectionRoute(app);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;