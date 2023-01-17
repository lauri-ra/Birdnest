import { Drone } from '../types';
import DroneView from './DroneView';

interface dataProps {
	drones: Drone[] | undefined;
}

const DroneList = (props: dataProps) => {
	return (
		<div>
			<div className='flex justify-center'>
				<p className='my-6 text-2xl font-light tracking-wide'>
					{props.drones?.length} drones have trespassed the nest during the last 10 minutes
				</p>
			</div>
			<div className='mx-5 grid grid-cols-4 place-items-center gap-3 pt-3'>
				{props.drones &&
					props.drones.map((drone) => <DroneView key={drone.serialNumber} drone={drone} />)}
			</div>
		</div>
	);
};

export default DroneList;
