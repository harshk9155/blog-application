import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Connection from './Database/db.js';
import Router from './route/route.js';

const app = express();

app.use(cors({ origin: 'https://blog-application-eight-dun.vercel.app', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', Router);

const PORT = process.env.PORT || 8000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
