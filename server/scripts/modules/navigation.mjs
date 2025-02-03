import { getPoint, json } from './fetch.mjs';

const countLoadedDisplays = () => displays.filter(d => d.status !== STATUS.loading).length;

const getWeather = async (latLon, callback) => {
    try {
        const point = await getPoint(latLon.lat, latLon.lon);
        if (callback) callback(point);

        const stations = (await json(point.properties.observationStations)).features ?? [];
        const firstStation = stations[0]?.properties?.stationIdentifier ?? '';

        const { city, state } = point.properties.relativeLocation.properties;

        Object.assign(weatherParameters, {
            latitude: latLon.lat, longitude: latLon.lon, stationId: firstStation,
            city, state, timeZone: point.properties.timeZone, forecast: point.properties.forecast
        });

        displays.forEach(display => display.getData(weatherParameters));
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
    }
};

export { countLoadedDisplays, getWeather };
