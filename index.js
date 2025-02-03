import express from 'express';
import fs from 'fs';
import path from 'path';
import corsPassThru from './cors.js';

const app = express();
const port = process.env.WS3KP_PORT ?? 8083;
const __dirname = path.resolve();
const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

app.set('view engine', 'ejs');

// CORS handling for stations
app.get('/stations/*', corsPassThru);

// Serve static files efficiently
if (process.env?.DIST === '1') {
    app.use(express.static(path.join(__dirname, './dist')));
} else {
    app.get(['/', '/index.html'], (req, res) => 
        res.render('views/index', { production: false, version })
    );
    app.use(express.static(path.join(__dirname, './server')));
}

const server = app.listen(port, () => 
    console.log(`🚀 Server running on http://localhost:${port}`)
);

// Graceful shutdown handling
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('✅ Server successfully closed');
        process.exit(0);
    });
});
