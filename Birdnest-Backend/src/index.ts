import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import droneRouter from './routes/drones';

console.log('Connenting to', process.env.MONGODB_URI);

mongoose
	.connect(`${process.env.MONGODB_TEST}`)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
	console.log('pinged');
	response.send('pong');
});

app.use('/api/drones', droneRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
