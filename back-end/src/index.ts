import express from 'express';
import bodyParser from 'body-parser';
import shopRoutes from './routes/shop.routes';
import customizationRoutes from './routes/customization.routes';
import translationRoutes from './routes/translation.routes';
import { AppDataSource } from './database/data-source';
import authRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;
const cors = require('cors');

// Middleware
app.use(bodyParser.json());
app.use(cors());

//  DataSource
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected');

        //  routes
        app.use('/api/auth', authRoutes);
        app.use('/api/shop', shopRoutes);
        app.use('/api/customization', customizationRoutes);
        app.use('/api/translation', translationRoutes);


        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error: unknown) => {
        if (error instanceof Error) {
            console.error('Database connection failed:', error.message);
        } else {
            console.error('Database connection failed:', error);
        }
    });
