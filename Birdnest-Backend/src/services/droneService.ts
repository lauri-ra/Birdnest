import { parseString } from 'xml2js';
import { Drone } from '../types';

const getDrones = (data: any): Array<Drone> => {
	const droneArray: Array<Drone> = [];

	parseString(data as string, (error, result) => {
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
					distance: 0,
				};

				droneArray.push(newDrone);
			});
		}
	});

	return droneArray;
};

const calculateDistance = (drone: Drone): Drone => {
	const x1 = drone.positionX;
	const y1 = drone.positionY;
	const x2 = 250000;
	const y2 = 250000;

	const distance: number = Math.sqrt((x2 - Number(x1)) ** 2 + (y2 - Number(y1)) ** 2);

	return { ...drone, distance: distance };
};

const checkTrespassing = (drone: Drone): boolean => {
	const r = 100000;

	// Check if the point is inside the circle
	if (drone.distance < r) {
		console.log('The point is inside the circle.');
		return true;
	} else if (drone.distance === r) {
		console.log('The point is on the circle.');
		return true;
	} else {
		console.log('The point is outside the circle.');
		return false;
	}
};

export default { getDrones, checkTrespassing, calculateDistance };
