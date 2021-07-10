import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';

import { useApolloClient } from '@apollo/client';

const App = () => {
	const [page, setPage] = useState('authors');
	const [errorMessage, setErrorMessage] = useState(null);

	const client = useApolloClient();

	const [token, setToken] = useState(null);

	const handleSetTokenAndMoveToNewPage = (token, page) => {
		setToken(token);
		setPage(page);
	};

	const errNotify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
	};

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button
					onClick={() => {
						setPage('books');
					}}>
					books
				</button>
				<button
					style={{ display: token ? 'initial' : 'none' }}
					onClick={() => setPage('add')}>
					add book
				</button>
				<button
					style={{ display: token ? 'none' : 'initial' }}
					onClick={() => setPage('login')}>
					log in
				</button>
				<button
					onClick={() => {
						logout();
					}}>
					log out
				</button>
			</div>

			<Authors show={page === 'authors'} errNotify={errNotify} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} errNotify={errNotify} />

			<Login
				onSetToken={handleSetTokenAndMoveToNewPage}
				show={page === 'login'}
			/>

			<Notify errorMessage={errorMessage} />
		</div>
	);
};

const Notify = ({ errorMessage }) => {
	if (!errorMessage) {
		return null;
	}
	return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default App;
