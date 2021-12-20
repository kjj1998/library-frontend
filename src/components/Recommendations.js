import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

import { ALL_BOOKS_IN_A_GENRE } from "../queries";

const Recommendations = (props) => {
	const [books, setBooks] = useState(null)
	const [getBooks, result] = useLazyQuery(ALL_BOOKS_IN_A_GENRE)
		
	useEffect(() => {	
		getBooks({ variables: { genreToSearch: props.favoriteGenre } })
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [getBooks, props.favoriteGenre, result.data])
	
	if (!props.show)
		return null
	
	return (
		<div>
			<h2>recommendations</h2>
			<p>books in your favorite genre <strong>{props.favoriteGenre}</strong></p>
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
						/* only books belonging to the favorite genre are shown */
						books.map(b => {
							if (b.genres.includes(props.favoriteGenre)) { 
								return (
									<tr key={b.title}>
										<td>{b.title}</td>
										<td>{b.author.name}</td>
										<td>{b.published}</td>
									</tr>
								)
							} else {
								return null
							}		
					})}
        </tbody>
      </table>
		</div>
	)

}

export default Recommendations