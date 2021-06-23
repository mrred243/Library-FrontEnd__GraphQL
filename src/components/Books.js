import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const ALL_BOOK = gql`
	query {
		allBooks {
			title
			published
			author
			genres
		}
	}
`;

const Books = props => {
	const [books, setBooks] = useState([]);

	const result = useQuery(ALL_BOOK);

	useEffect(() => {
		if (result.data) setBooks(result.data.allBooks);
	}, [result]);

	if (!props.show) {
		return null;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books
						? books.map(a => (
								<tr key={a.title}>
									<td>{a.title}</td>
									<td>{a.author}</td>
									<td>{a.published}</td>
								</tr>
						  ))
						: null}
				</tbody>
			</table>
		</div>
	);
};

export default Books;
