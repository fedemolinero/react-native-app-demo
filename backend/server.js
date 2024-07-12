import express from 'express';
import { router as productRoutes } from './routes/productRoutes.js';
// Importing router with alias
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:8081'
}));

const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// routes for products
app.use('/api', productRoutes); // using routes exported from productRoutes.js

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
