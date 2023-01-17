import { Pilot } from '../types';
import mongoose from 'mongoose';

export const pilotSchema = new mongoose.Schema<Pilot>({
	firstName: String,
	lastName: String,
	email: String,
	phoneNumber: String,
});

// Make sure NextJS doesn't try to re-create the model on every render
const pilotModel = mongoose.models.pilotModel || mongoose.model('pilotModel', pilotSchema);

export default pilotModel;
