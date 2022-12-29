import express from 'express';
import axios from 'axios';

import droneService from '../services/droneService';
import { Drone } from '../types';

const router = express.Router();
const url = 'http://assignments.reaktor.com/birdnest/drones';

const datasource: Array<Drone> = [];

setInterval(async () => {
	console.log('fetching...');

	const request = await axios.get(url);
	const drones: Array<Drone> = droneService.getDrones(request.data);

	drones.forEach((drone: Drone) => {
		// Add distance from the nest to the drone information
		drone = droneService.calculateDistance(drone);

		// Check if drone is trespassing
		if (droneService.checkTrespassing(drone)) {
			datasource.push(drone);
		}
	});
}, 2000);

router.get('/', (_request, response) => {
	response.send(datasource);
});

export default router;
