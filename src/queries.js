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