import express from 'express';
import droneService from '../services/droneService';

const router = express.Router();

setInterval(async () => {
	console.log('fetching...');
	await droneService.getDrones();
}, 2000);

router.get('/', (_request, response) => {
	response.send('drones');
});

export default router;
