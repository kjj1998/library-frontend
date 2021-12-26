/* import libraies */
import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

/* import components */
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

/* import queries */
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
	const [token, setToken] = useState(null)
	const [favoriteGenre, setFavoriteGenre] = useState('')
	
	const books = useQuery(ALL_BOOKS)				// call the query to fetch all books
	const authors = useQuery(ALL_AUTHORS)		// call the query to fetch all authors
	const client = useApolloClient()

	/* check if there is an existing token in the local storage */
	useEffect(() => {
		if (localStorage.getItem('library-user-token')) {
			setToken(localStorage.getItem('library-user-token'))
			setFavoriteGenre(localStorage.getItem('user-favorite-genre'))
			setPage('authors')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token])
	
	const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

	useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

	if (authors.loading || books.loading) {		// wait for query to finish running
		return <div>loading...</div>
	}

	/* set token to null and clear the localStorage and client */
	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
		setPage('authors')
	}

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? 
						<>
							<button onClick={() => setPage('add')}>add book</button>
							<button onClick={() => setPage('recommendations')}>recommendations</button>
							<button onClick={() => logout()}>logout</button>
						</>
					:
					<button onClick={() => setPage('login')}>login</button>
				}
      </div>

      <Authors
        show={page === 'authors'} authors={authors.data.allAuthors} books={books.data.allBooks}
      />

      <Books
        show={page === 'books'} books={books.data.allBooks}
      />

      <NewBook
        show={page === 'add'} updateCacheWith={updateCacheWith}
      />

			<LoginForm
				show={page === 'login'} setToken={setToken} setFavoriteGenre={setFavoriteGenre}
			/>

			<Recommendations
				show={page === 'recommendations'} favoriteGenre={favoriteGenre}
			/>

    </div>
  )
}

export default App