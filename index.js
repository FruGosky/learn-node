import express from 'express';

const app = express();
const port = 3000;

const users = [
	{ id: 1, name: 'Janek', email: 'janek@gmail.com' },
	{ id: 2, name: 'Adam', email: 'adam@gmail.com' },
	{ id: 3, name: 'Tomasz', email: 'tomek@my.com' },
	{ id: 4, name: 'Dawid', email: 'dawid@email.com' },
];

app.get('/', (req, res) => {
	res.send('Home page!');
});

app.get('/kontakt', (req, res) => {
	res.send('Kontakt!');
});

app.get('/profile', (req, res) => {
	let page = `Znaleziono ${users.length} profile. <br />`;
	users.map((user) => {
		page += `<a href="/profile/${user.id}">${user.name}</a><br />`;
	});
	res.send(page);
});

app.get('/profile/:id/:mode?', (req, res) => {
	debugger;
	const { id, mode } = req.params;
	const user = users.find((user) => user.id === parseInt(id));
	if (!user) return res.send('Nie znaleziono użytkownika');

	let page = 'Dane użytkownika: <br/>';
	page += `imie: "${user.name}", <br/>`;

	if (mode !== 'szczegoly') return res.send(page);

	page += `id: "${user.id}", <br/>`;
	page += `email: "${user.email}"`;
	res.send(page);
});

app.listen(port, () => {
	console.log(`App listening at: http://localhost:${port}`);
});
