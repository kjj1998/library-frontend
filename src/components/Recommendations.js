import React from "react";

const Recommendations = (props) => {
	if (!props.show)
		return null

	const books = props.books
	const favoriteGenre = props.favoriteGenre
	
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
							if (b.genres.includes(favoriteGenre)) { 
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