import { gql } from '@apollo/client';

export const ALL_AUTHOR = gql`
	query {
		allAuthors {
			name
			born
			bookCount
			id
		}
	}
`;

export const ALL_BOOK = gql`
	query {
		allBooks {
			title
			published
			author {
				name
			}
			genres
			id
		}
	}
`;

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$published: Int!
		$genres: [String]
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			title
			author {
				name
			}
			published
			genres
		}
	}
`;

export const EDIT_AUTHOR_BIRTHYEAR = gql`
	mutation editAuthorBirthyear($name: String!, $born: Int!) {
		editAuthor(name: $name, setBornTo: $born) {
			name
			born
			id
		}
	}
`;

// Authentication query
export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
