import React from 'react'
import SetBirthYear from './SetBirthYear'

const Authors = (props) => {
  let authors = props.authors
	const books = props.books
	
	const getAuthorBooksCount = (books, authors) => {
		authors = authors.map(author => {
			let bookCount = 0
			books.map(book => {
				if (book.author.name === author.name) {
					bookCount += 1
				}
				return book
			})

			let authorWithBookCount = { ...author, bookCount: bookCount }	// create new object with the bookCount field, author object has to be jsonified to remove unnecessary fields
			return authorWithBookCount
		})

		return authors
	}

	authors = getAuthorBooksCount(books, authors)

	if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
			<SetBirthYear authors={authors} />
    </div>
  )
}

export default Authors
