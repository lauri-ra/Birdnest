import express from 'express';
import axios from 'axios';
import { parseString } from 'xml2js';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (_request, response) => {
	const drones = await axios.get('http://assignments.reaktor.com/birdnest/drones');

	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	parseString(drones.data, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			response.send(result);
		}
	});
});

export default router;
