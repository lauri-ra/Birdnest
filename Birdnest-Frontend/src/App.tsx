import { useState, useEffect } from 'react';
import { Drone } from './types';
import DroneList from './components/DroneList';
import axios from 'axios';

const getAll = () => {
	const request = axios.get('/api/drones');
	return request.then((response) => response.data);
};

function Drones() {
	const [data, setData] = useState<Drone[]>([]);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setInterval(() => {
			getAll().then((data) => {
				setData(data);
				setLoading(false);
			});
		}, 2000);
	}, []);

	if (isLoading) return <p className='flex justify-center text-xl'>Getting bad drones...</p>;

	return <DroneList drones={data} />;
}

export default function Home() {
	return (
		<>
			<h1>
				<title>Birdnest</title>
				<link rel='icon' href='/favicon.ico' />
			</h1>
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
