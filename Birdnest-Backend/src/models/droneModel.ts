import { Drone } from '../types';
import pilotModel from './pilotModel';
import mongoose from 'mongoose';

const droneSchema = new mongoose.Schema<Drone>({
	serialNumber: String,
	positionY: String,
	positionX: String,
	distance: Number,
	pilot: { type: pilotModel.schema },
	timestamp: Date,
});

// Make sure NextJS doesn't try to re-create the model on every render
const droneModel = mongoose.models.droneModel || mongoose.model('droneModel', droneSchema);

export default droneModel;
