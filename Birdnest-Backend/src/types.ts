export interface Drone {
	serialNumber: string;
	positionY: string;
	positionX: string;
	distance: number;
}

export interface Drone2 {
	serialNumber: string;
	model: string;
	manufacturer: string;
	mac: string;
	ipv4: string;
	ipv6: string;
	firmware: string;
	positionY: string;
	positionX: string;
	altitude: string;
}
