import * as express from 'express';
import * as session from 'express-session';
import * as fs from 'fs';

const app = express();
const PORT = 3000;

app.use(session({
	secret: 'Have all the passwords!',
	resave: false,
	saveUninitialized: true
}));

app.use((req, res, next) => {
	if (!req.session.requestCount) req.session.requestCount = 0;

	req.session.requestCount++;

	next();
});

app.get('/', (req, res) => {
	res.send(`You have made ${req.session.requestCount} request${req.session.requestCount === 1 ? '' : 's'}.`);
});

app.get('/math', (req, res) => {
	res.sendFile(__dirname + '/views/math.html');
});

app.get('/game', (req, res) => {
	res.sendFile(__dirname + '/views/game.html');
});

app.get('*', (req, res) => {
	res.send('404\'d');
});

app.listen(PORT, () => {
	console.log(`Node server listening on http://localhost:${PORT}`);
})