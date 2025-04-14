import express from 'express';
import connectDB from './config/connection.js';
import routes from './routes/index.js';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
async function startServer() {
    try {
        const connection = await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        console.log(`Connected to MongoDB ${connection.host}`);
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
}
startServer();
