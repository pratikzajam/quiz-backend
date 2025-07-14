// api/server.js
import express from 'express';
import connectDb from '../src/Config/DbConfig.js';
import Router from '../src/Routes/user.routes.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Connect to DB
connectDb(); // Ensure this runs on import

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", Router);

// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});


export default app;
