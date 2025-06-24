require('dotenv').config();
import 'reflect-metadata';
import express from 'express';
import userRoutes from './presentation/http/routes/user.routes';
import authRoutes from './presentation/http/routes/auth.routes';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/backend/users', userRoutes);
app.use('/api/backend/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});