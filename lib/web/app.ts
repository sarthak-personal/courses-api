import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import courseRoutes from './routes/courseRoutes';
import { setupSwagger } from '../config/swagger';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api/courses', courseRoutes);

// Setup Swagger
setupSwagger(app);

export default app;
