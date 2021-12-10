/* import libraies */
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

/* import components */
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

/* import queries */
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
	const authors = useQuery(ALL_AUTHORS)		// call the query to fetch all authors
	const books = useQuery(ALL_BOOKS)				// call the query to fetch all books
	
	if (authors.loading || books.loading) {		// wait for query to finish running
		return <div>loading...</div>
	}

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors}
      />

      <Books
        show={page === 'books'} books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App