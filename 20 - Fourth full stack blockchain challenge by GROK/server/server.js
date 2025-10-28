import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import JSONBig from 'json-bigint';
export const bigJsonStringify = JSONBig.stringify;

const app = express();
const PORT = process.env.SERVER_PORT;

// Middlewares
const corsOptions = {
  origin: [
    process.env.DEVELOP_CLIENT_URL
  ]
}
app.use(cors(corsOptions)); // Trusted URLs.
app.use(express.json()); // It is used to read JSON in the body request.
app.use(express.urlencoded({ extended: true })); // It is used to read data from HTML forms (x-www-form-urlencoded).

app.use((req, res, next) => {
  res.jsonBig = (data) => {
    const jsonString = bigJsonStringify(data);
    res.set('Content-Type', 'application/json');
    res.send(jsonString);
  };
  next();
});

import votingSystemRoute from './src/routes/VotingSystemRoute.js';
votingSystemRoute(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;