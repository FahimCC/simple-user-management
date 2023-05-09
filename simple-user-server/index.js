const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

const users = [
	{ _id: 1, name: 'Fahim', email: 'fahim@gmail.com' },
	{ _id: 2, name: 'Faysal', email: 'faysal@gmail.com' },
	{ _id: 3, name: 'Nasif', email: 'nasif@gmail.com' },
];

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Simple User Server is running.......');
});

app.get('/users', (req, res) => {
	res.send(users);
});

app.post('/users', (req, res) => {
	const newUser = req.body;
	newUser._id = users.length + 1;
	users.push(newUser);
	res.send(newUser);
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
