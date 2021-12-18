import React, { useState } from 'react'

/* function to retrieve all unique genres and store them in an array */
const getGenres = (books) => {
	let listOfGenres = []
	books.map(b => 
		b.genres.map(g => 
			listOfGenres.push(g)
		)
	)

	listOfGenres = [...new Set(listOfGenres)]
	listOfGenres.push('all genres')

	return listOfGenres
}

const Books = (props) => {
	const [selectedGenre, setSelectedGenres] = useState('all genres')

  if (!props.show) {
    return null
  }

  const books = props.books
	const listOfGenres = getGenres(books)

  return (
    <div>
      <h2>books</h2>
			<p>in genre <strong>{selectedGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
						/* only books belonging to the selected genres are shown, when selected genre is 'all genres', all books are shown */
						books.map(a => {
							if (selectedGenre === 'all genres' || a.genres.includes(selectedGenre)) { 
								return (
									<tr key={a.title}>
										<td>{a.title}</td>
										<td>{a.author.name}</td>
										<td>{a.published}</td>
									</tr>
								)
							} else {
								return null
							}		
					})}
        </tbody>
      </table>
			{
				/* button to set the selected genre */
				listOfGenres.map(g => 
					<button key={g} onClick={() => setSelectedGenres(g)}>{g}</button>
			)}
    </div>
  )
}

export default Books