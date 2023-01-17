export interface Drone {
	serialNumber: string;
	positionY: string;
	positionX: string;
	distance: number;
	pilot: Pilot | null;
	timestamp: Date;
}

export interface Pilot {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
}
