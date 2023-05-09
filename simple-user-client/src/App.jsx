import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetch('http://localhost:5000/users')
			.then(res => res.json())
			.then(data => setUsers(data));
	}, []);

	const handleSubmit = e => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		console.log(name, email);

		fetch('http://localhost:5000/users', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ name, email }),
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				const newUser = [...users, data];
				setUsers(newUser);
				form.reset();
			});
	};

	return (
		<>
			<h1>User Management</h1>
			<div className='card'>
				<form onSubmit={handleSubmit}>
					<div>
						<input type='text' placeholder='Name' name='name' required />
					</div>
					<div>
						<input type='text' placeholder='Email' name='email' required />
					</div>
					<input type='submit' value='Add User' />
				</form>
			</div>
			<div className='card'>
				<h3>Number of Users: {users.length}</h3>
				<table width={5}>
					<thead></thead>
					<tbody>
						{users.map(user => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
