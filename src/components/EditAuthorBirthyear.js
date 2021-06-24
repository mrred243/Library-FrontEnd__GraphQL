import React, { useState, useEffect } from 'react';

import Select from 'react-select';

import { useMutation } from '@apollo/client';

import { EDIT_AUTHOR_BIRTHYEAR } from '../queries';

const EditAuthorBirthyear = ({ errNotify, nameOptions }) => {
	const [name, setName] = useState(null);
	const [born, setBorn] = useState('');

	const [changeBornYear, result] = useMutation(EDIT_AUTHOR_BIRTHYEAR);

	const submit = (event) => {
		event.preventDefault();

		changeBornYear({ variables: { name: name.value, born } });

		setBorn('');
	};

	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			errNotify('author not found');
		}
	}, [result.data]);

	return (
		<div>
			<h2>Edit Author's Birth year</h2>
			<form onSubmit={submit}>
				<div>
					Name{' '}
					<Select
						defaultValue={name}
						onChange={setName}
						options={nameOptions}
					/>
				</div>
				<div>
					Born Year{' '}
					<input
						type='number'
						value={born}
						onChange={({ target }) => setBorn(Number(target.value))}
					/>
				</div>
				<button type='submit'>update</button>
			</form>
		</div>
	);
};

export default EditAuthorBirthyear;
