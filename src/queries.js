import { gql } from '@apollo/client'

/* Query to fetch all authors from the backend */
export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			id
			bookCount
		}
	}
`