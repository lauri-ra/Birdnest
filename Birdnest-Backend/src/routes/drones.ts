import express from 'express';
import droneService from '../services/droneService';
import { Drone } from '../types';

const router = express.Router();

setInterval(async () => {
	console.log('fetching...');
	const drones: Array<Drone> = await droneService.getDrones();

	drones.forEach((drone) => {
		droneService.checkTrespassing(drone.positionX, drone.positionY);
	});
}, 2000);

router.get('/', (_request, response) => {
	response.send('drones');
});

export default router;
