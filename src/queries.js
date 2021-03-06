import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		id
		title
		published
		author {
			name
			born
		}
		genres
	}
`

/* Query to fetch all authors from the backend */
export const ALL_AUTHORS = gql`
	query allAuthors {
		allAuthors {
			name
			born
			id
		}
	}
`

/* Query to fetch all books and their details*/
export const ALL_BOOKS = gql`
	query allBooks {
		allBooks {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

/* Mutation to add a book to the backend database */
export const ADD_BOOK = gql`
	mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String]) {
		addBook(
			title: $title,
			author: $author,
			published: $published,
			genres: $genres,
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

/* Mutation to edit/set the birth year of a particular author */
export const EDIT_AUTHOR = gql`
	mutation editAuthor($author: String!, $birthYear: Int!) {
		editAuthor(name: $author, setBornTo: $birthYear) {
			name
			born
			id
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

/* Query to retrieve all books in a specified genre */
export const ALL_BOOKS_IN_A_GENRE = gql`
	query allBooksInAGenre($genreToSearch: String!) {
		allBooks(genre: $genreToSearch) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`