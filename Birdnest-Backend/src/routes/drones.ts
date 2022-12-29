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
			// Check if fetched drone already exsists
			const found = datasource.find((d) => d.serialNumber === drone.serialNumber);

			// If there is an exsisting drone, we just update the distance
			if (found) {
				// If the current distance is smaller, update the value
				if (drone.distance < found.distance) {
					console.log('updated distance from', found.distance, 'to', drone.distance);
					found.distance = drone.distance;
				}
			} else {
				datasource.push(drone);
			}
		}
	});
}, 2000);

router.get('/', (_request, response) => {
	response.send(datasource);
});

export default router;
