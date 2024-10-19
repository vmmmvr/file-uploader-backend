import express from 'express';
import { ENV } from './config';
import router from './router';
import logger from './config/logger';
import { errorHandler } from './config/utils/errorHandler';
import path from 'path';
import cors from "cors";


const app = express();
// Enable CORS for any origin
app.use(cors({
    origin: "*",  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  }));

app.use(express.json()); 

// Routes
app.use(router);
// Serve files in the uploads directory as static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));




// Global Error Handling
app.use(errorHandler);

// Set up the server to listen on a specific port
const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    logger.info('Application started successfully!');
});
