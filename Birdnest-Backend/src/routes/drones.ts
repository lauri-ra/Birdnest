import express from 'express';
import axios from 'axios';

import droneService from '../services/droneService';
import { Drone } from '../types';
import droneModel from '../models/droneModel';

const router = express.Router();
const baseURL = 'http://assignments.reaktor.com/birdnest/';

// Flags that make sure functions wait for promises to return before running again
let gettingDrones = false;

// Fetch drones from the API and store the to the database
async function fetchDrones(): Promise<void> {
	if (gettingDrones) return;
	gettingDrones = true;
	try {
		const XML = await axios.get(baseURL + 'drones');
		const drones: Array<Drone> = droneService.parseToJson(XML.data);

		for (let drone of drones) {
			// Add distance from the nest to the drone information
			drone = droneService.calculateDistance(drone);

			// Check if the drone is trespassing the nest
			if (droneService.checkTrespassing(drone)) {
				const existingDrone = await droneModel.findOne({ serialNumber: drone.serialNumber });

				// Update to closer distance if the drone has already passed previously within 10 min
				if (existingDrone) {
					if (drone.distance < existingDrone.distance) {
						const filter = { serialNumber: drone.serialNumber };
						const update = { distance: drone.distance, timestamp: drone.timestamp };

						await droneModel.findOneAndUpdate(filter, update);
					}
				} else {
					// First time trespasser? -> Get the pilot and push the full data to DB
					const pilot = await axios.get(baseURL + `pilots/${drone.serialNumber}`);
					drone = droneService.setPilot(drone, pilot.data);

					const newDrone = new droneModel(drone);
					await newDrone.save();
				}
			}
		}
	} catch (error) {
		console.log(error);
	} finally {
		setTimeout(() => {
			gettingDrones = false;
			fetchDrones();
		}, 2000);
	}
}

// Remove drones that have not passed within the past 10 min
setInterval(async () => {
	const drones = await droneModel.find({});

	for (let drone of drones) {
		const timeToRemove = droneService.checkTime(drone.timestamp);

		if (timeToRemove) {
			console.log('removing drone', drone.serialNumber);
			await droneModel.deleteOne({ serialNumber: drone.serialNumber });
		}
	}
}, 2000);

router.get('/', async (_request, response) => {
	fetchDrones();

	const data = await droneModel.find({});

	response.send(data);
});

export default router;
