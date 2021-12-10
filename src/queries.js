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

/* Query to fetch all books except details of their genres */
export const ALL_BOOKS = gql`
	query allBooks {
		allBooks {
			title,
			published,
			author,
			id
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