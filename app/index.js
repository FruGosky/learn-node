const app = require('./app');
const { port } = require('./config');

app.listen(port, () => {
	console.log(`App listening at: http://localhost:${port}`);
});
