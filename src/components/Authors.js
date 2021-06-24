import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import EditAuthorBirthyear from './EditAuthorBirthyear';

import { ALL_AUTHOR } from '../queries';

const Authors = ({ errNotify, show }) => {
	const result = useQuery(ALL_AUTHOR);

	const [nameOptions, setNameOptions] = useState([]);

	useEffect(() => {
		if (result.data) {
			let authorNameArr = [
				...result.data.allAuthors.map((author) => {
					return { value: author.name, label: author.name };
				}),
			];
			setNameOptions(authorNameArr);
		}
	}, [result.loading]);

	if (!show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{result.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<EditAuthorBirthyear
				nameOptions={nameOptions}
				errNotify={errNotify}
			/>
		</div>
	);
};

export default Authors;
