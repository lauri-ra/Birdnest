import axios from 'axios';
import { parseString } from 'xml2js';
import { Drone } from '../types';

// Check returned data and map it to an array or sth
const getDrones = async (): Promise<Array<Drone>> => {
	const jee: Array<Drone> = [];

	const request = await axios.get('http://assignments.reaktor.com/birdnest/drones');

	parseString(request.data as string, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const drones = result.report.capture[0].drone;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			drones.forEach((drone: any) => {
				const newDrone = {
					serialNumber: drone.serialNumber[0],
					positionY: drone.positionY[0],
					positionX: drone.positionX[0],
				};

				jee.push(newDrone);
			});
		}
	});

	return jee;
};

const checkTrespassing = (x1: string, y1: string) => {
	const x2 = 250000;
	const y2 = 250000;
	const r = 100000;

	const distance: number = Math.sqrt((x2 - Number(x1)) ** 2 + (y2 - Number(y1)) ** 2);

	// Check if the point is inside the circle
	if (distance < r) {
		console.log('The point is inside the circle.');
	} else if (distance === r) {
		console.log('The point is on the circle.');
	} else {
		console.log('The point is outside the circle.');
	}
};

export default { getDrones, checkTrespassing };
