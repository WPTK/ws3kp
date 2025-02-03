import { celsiusToFahrenheit, kphToMph, kilometersToMiles, pascalToInHg } from './units.mjs';

const shortConditions = (condition) => 
    condition.replace(/(Light|Heavy|Partly|Mostly|Few)/g, (m) => m[0])
             .replace(/Thunderstorm/, "T'storm")
             .replace(/ in |Vicinity| and | with /g, '/')
             .replace(/Freezing Rain/, 'Frz Rn')
             .replace(/Freezing/, 'Frz')
             .replace(/Unknown Precip/, '');

const findValidStation = (stations) => 
    stations.find(st => st.properties.stationIdentifier.length === 4 && !skipStations.includes(st.properties.stationIdentifier[0]));

const parseData = (data) => {
    const obs = data.features[0]?.properties;
    if (!obs) return null;

    return {
        Temperature: celsiusToFahrenheit(obs.temperature.value),
        WindSpeed: kphToMph(obs.windSpeed.value),
        WindDirection: directionToNSEW(obs.windDirection.value),
        Visibility: kilometersToMiles(obs.visibility.value / 1000),
        Pressure: pascalToInHg(obs.barometricPressure.value),
        Humidity: Math.round(obs.relativeHumidity.value),
        Icon: getWeatherIconFromIconLink(obs.icon)
    };
};

export { shortConditions, findValidStation, parseData };
