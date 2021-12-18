import { gql } from '@apollo/client'

/* Query to fetch all authors from the backend */
export const ALL_AUTHORS = gql`
	query allAuthors {
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`

/* Query to fetch all books and their details*/
export const ALL_BOOKS = gql`
	query allBooks {
		allBooks {
			title,
			published,
			author {
				name
				born
				id
				bookCount
			}
			id
			genres
		}
	}
`

/* Mutation to add a book to the backend database */
export const CREATE_BOOK = gql`
	mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres,
		) {
			title
			published
			author
			id
			genres
		}
	}
`

/* Mutation to edit/set the birth year of a particular author */
export const EDIT_AUTHOR = gql`
	mutation editAuthor($author: String!, $birthYear: Int!) {
		editAuthor(name: $author, setBornTo: $birthYear) {
			name
			born
			id
			bookCount
		}
	}
`

/* Mutation to allow the user to login */
export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
			favoriteGenre
		}
	}
`