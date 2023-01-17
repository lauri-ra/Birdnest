import { Drone } from '../types';

interface DroneViewProps {
	drone: Drone;
}

const DroneView = (props: DroneViewProps) => {
	const time = new Date(props.drone.timestamp);
	const roundedDist = (props.drone.distance / 1000).toFixed(2);

	return (
		<div className='my-3.5 w-72 rounded-md bg-slate-700 px-3.5 py-2 shadow-lg ring-1 ring-white/10 transition duration-100 hover:scale-105 hover:bg-slate-600'>
			<div>
				<b>Drone ID: </b>
				{props.drone.serialNumber}
			</div>
			<div>
				<b>Distance: </b>
				{roundedDist} meters
			</div>
			<div>
				<b>Trespassed: </b>
				{time.toLocaleString('fi-FI')}
			</div>

			<br />

			<div>
				<b>
					<u>Pilot information </u>
				</b>
				<div>
					{props.drone.pilot?.firstName} {props.drone.pilot?.lastName}
					<br />
					{props.drone.pilot?.phoneNumber}
					<br />
					{props.drone.pilot?.email}
				</div>
			</div>
		</div>
	);
};

export default DroneView;
