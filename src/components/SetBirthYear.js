import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_AUTHOR } from '../queries'

const SetBirthYear = (props) => {
	const [author, setAuthor] = useState('')
	const [birthYear, setBirthYear] = useState('')

	/*
	 * use EDIT_AUTHOR mutation to set/edit the birthyear of the author
	 */
	const [ changeBirthYear, result ] = useMutation(EDIT_AUTHOR)

	const submit = (event) => {
		event.preventDefault()

		/* Check that author and born fields have valid values */
		if ( author === "" || birthYear === "") {
			console.log('The author and birthyear fields must all have valid values')
			return
		}

		/* Call the mutation to set the birth year */
		changeBirthYear({
			variables: { author, birthYear: parseInt(birthYear) }
		})

		setAuthor('')
		setBirthYear('')
	}

	/* 
	 * Check if null value is returned, this means that the 
	 * author cannot be found in the database
	 */
	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			console.log('author not found')
		}
	}, [result.data])

	return (
		<div>
			<h3>Set birthyear</h3>

			<form onSubmit={submit}>
				<div>
					name <input value={author} onChange={({ target }) => setAuthor(target.value)} />
				</div>
				<div>
					birthyear <input type='number' value={birthYear} onChange={({ target }) => setBirthYear(target.value)} />
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	)
}

export default SetBirthYear