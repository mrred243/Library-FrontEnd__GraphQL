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
			author
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
			author
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
