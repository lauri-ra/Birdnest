import axios from 'axios';
import { parseString } from 'xml2js';

// Check returned data and map it to an array or sth
const getDrones = async () => {
	const request = await axios.get('http://assignments.reaktor.com/birdnest/drones');

	parseString(request.data as string, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const drones = result.report.capture[0].drone;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			drones.forEach((drone: any) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const id = drone.serialNumber[0];
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const positionX = drone.positionX[0];
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const positionY = drone.positionY[0];

				console.log(id);
				checkTrespassing(Number(positionX), Number(positionY));
			});
		}
	});
};

const checkTrespassing = (x1: number, y1: number) => {
	const x2 = 250000;
	const y2 = 250000;
	const r = 100000;

	const distance: number = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

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
