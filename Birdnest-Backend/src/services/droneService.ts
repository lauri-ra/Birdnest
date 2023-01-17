import { parseString } from 'xml2js';
import { Drone, Pilot } from '../types';

const checkTime = (timestamp: any): boolean => {
	const currentTime = new Date();
	const interval = new Date(currentTime.getTime() - 10 * 60 * 1000);

	return new Date(timestamp) < interval;
};

const setPilot = (drone: Drone, pilotData: any) => {
	const pilot: Pilot = {
		firstName: pilotData.firstName,
		lastName: pilotData.lastName,
		email: pilotData.email,
		phoneNumber: pilotData.phoneNumber,
	};

	return { ...drone, pilot: pilot };
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
		return true;
	} else if (drone.distance === r) {
		return true;
	} else {
		return false;
	}
};

const parseToJson = (data: any): Array<Drone> => {
	const droneArray: Array<Drone> = [];

	parseString(data as string, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			const drones = result.report.capture[0].drone;
			const time = new Date(result.report.capture[0].$.snapshotTimestamp);

			drones.forEach((drone: any) => {
				const newDrone = {
					serialNumber: drone.serialNumber[0],
					positionY: drone.positionY[0],
					positionX: drone.positionX[0],
					distance: 0,
					pilot: null,
					timestamp: time,
				};

				droneArray.push(newDrone);
			});
		}
	});

	return droneArray;
};

export default { checkTime, parseToJson, checkTrespassing, calculateDistance, setPilot };
