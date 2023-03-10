import { useState, useEffect } from 'react';
import { Drone } from './types';
import DroneList from './components/DroneList';
import axios from 'axios';

function Drones() {
	const [data, setData] = useState<Drone[]>([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setInterval(async () => {
			const request = await axios.get('/api/drones');
			setData(request.data);
			setLoading(false);
		}, 2000);
	}, []);

	if (isLoading)
		return (
			<p className='flex justify-center my-6 text-2xl font-light tracking-wide'>
				Getting bad drones...
			</p>
		);

	return <DroneList drones={data} />;
}

export default function App() {
	return (
		<>
			<main className='h-screen overflow-auto bg-slate-800/95 text-white'>
				<div className='sticky top-0 mb-3 flex w-full items-end justify-center py-3 ring-1 ring-white/10 backdrop-blur'>
					<div className='mr-5 text-4xl font-normal'>Birdnest</div>
					<div className='ml-5 text-xl font-thin overline'>
						Reaktor summer trainee pre-assignment 2023
					</div>
				</div>
				<Drones />
			</main>
		</>
	);
}
