const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

export const directionToNSEW = (dir) => directions[Math.floor((dir / 22.5) + 0.5) % 16];
export const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
export const wrap = (x, m) => ((x % m) + m) % m;
