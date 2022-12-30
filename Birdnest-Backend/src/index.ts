import express from 'express';

import droneRouter from './routes/drones';

const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_request, response) => {
	console.log('pinged');
	response.send('pong');
});

app.use('/api/drones', droneRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
