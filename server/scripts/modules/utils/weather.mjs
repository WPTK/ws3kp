import { json } from './fetch.mjs';

const getPoint = async (lat, lon) => {
	try {
		return await json(`https://api.weather.gov/points/${lat},${lon}`);
	} catch (error) {
		console.log(`Unable to get point ${lat}, ${lon}`);
		console.error(error);
		return false;
	}
};

export {
	// eslint-disable-next-line import/prefer-default-export
	getPoint,
};
